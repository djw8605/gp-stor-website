# pip install plotly kaleido

import plotly.graph_objects as go

states = ["SD", "NE", "KS", "MO", "OK", "AR"]

state_names = {
    "SD": "South Dakota",
    "NE": "Nebraska",
    "KS": "Kansas",
    "MO": "Missouri",
    "OK": "Oklahoma",
    "AR": "Arkansas",
}

# Approx bounding boxes for each state (min_lat, max_lat, min_lon, max_lon)
state_bounds = {
    "SD": (42.5, 45.95, -104.1, -96.4),
    "NE": (39.99, 43.01, -104.05, -95.3),
    "KS": (36.99, 40.00, -102.05, -94.61),
    "MO": (35.99, 40.61, -95.78, -89.10),
    "OK": (34.00, 37.00, -103.00, -94.43),
    "AR": (34.00, 36.50, -94.62, -89.64),
}

# Compute bounding extents
min_lat = min(state_bounds[s][0] for s in states)
max_lat = max(state_bounds[s][1] for s in states)
min_lon = min(state_bounds[s][2] for s in states)
max_lon = max(state_bounds[s][3] for s in states)

lat_span = max_lat - min_lat
lon_span = max_lon - min_lon

# Albers projection compensating padding:
# - More padding above SD to prevent clipping
# - Very little padding below AR to remove extra blank space
top_pad = lat_span * 0.4     # tuned for Albers projection
bottom_pad = lat_span * -0.1  # minimal padding below AR
side_pad = lon_span * 0.03    # small horizontal padding

lat_min_range = min_lat - bottom_pad
lat_max_range = max_lat + top_pad
lon_min_range = min_lon - side_pad
lon_max_range = max_lon + side_pad

# Centroids for labels
state_centers = {
    "SD": (44.5, -100.0),
    "NE": (41.5, -99.8),
    "KS": (38.5, -98.0),
    "MO": (38.4, -92.6),
    "OK": (35.5, -97.5),
    "AR": (34.8, -92.3),
}

fig = go.Figure()

# Highlighted states
fig.add_trace(
    go.Choropleth(
        locationmode="USA-states",
        locations=states,
        z=[1] * len(states),
        colorscale=[[0, "rgba(0,128,0,0.4)"], [1, "rgba(0,128,0,0.4)"]],
        marker_line_color="darkgreen",
        marker_line_width=2,
        showscale=False,
    )
)

# State name labels
fig.add_trace(
    go.Scattergeo(
        lon=[state_centers[s][1] for s in states],
        lat=[state_centers[s][0] for s in states],
        text=[state_names[s] for s in states],
        mode="text",
        textfont=dict(size=12, color="rgba(50,50,50,0.6)"),
        hoverinfo="skip",
    )
)

fig.update_layout(
    geo=dict(
        projection_type="albers usa",

        # Custom bounding box with corrected vertical padding
        lataxis=dict(range=[lat_min_range, lat_max_range]),
        lonaxis=dict(range=[lon_min_range, lon_max_range]),

        showland=True,
        landcolor="rgb(245,245,245)",
    ),
    width=500,
    height=500,
    margin=dict(l=0, r=0, t=0, b=0),
)

fig.show()
fig.write_image("central_states_map.svg")
