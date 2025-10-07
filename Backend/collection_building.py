from collections import defaultdict

data = [
    "1.2",
    "1.3",
    "10.2.5",
    "1077.2.5",
    "11.3.2.4",
    "1157.3.2.8",
    "12.1.1",
    "12.2",
    "1247.6",
    "13.2",
    "13.4.4",
    "13.4.8",
    "14.4.2",
    "15.4.7",
    "16.4.1",
    "18.4.1",
    "18.4.6",
    "19.7",
    "2.2",
    "2.7",
    "20111.3.2.6",
    "21612.1.4",
    "22313.4.2",
    "22713.7",
    "23714.7",
    "242.3",
    "24515.4.4",
    "28119.4.2",
    "3.1",
    "3.2.1",
    "3.2.3",
    "3.3.1",
    "3.3.2",
    "3.3.3",
    "3.4",
    "3.5",
    "3.5.2",
    "303",
    "309",
    "312",
    "363.2.2",
    "393.3",
    "4.1",
    "4.2",
    "4.3.1",
    "463.5.1",
    "483.5.3",
    "6.1",
    "6.2.1  The three project interests",
    "6.2.2",
    "6.2.3",
    "6.2.4.2",
    "6.2.4.3",
    "6.2.4.4",
    "6.3.1",
    "6.3.1.2",
    "6.3.1.3",
    "6.3.1.5",
    "6.3.2.1",
    "6.3.2.2",
    "6.4.1",
    "6.4.2",
    "6.4.5",
    "6.6",
    "7.1.1",
    "7.2.1",
    "7.2.2.2",
    "7.2.2.4",
    "8.6",
    "81.5.1",
    "846.3.1.1",
    "866.3.1.4",
    "9.1",
    "9.2",
    "9.2.4",
    "916.4.4",
    "956.7",
]

parent_map = defaultdict(list)

# First pass: Group by 2-level prefix
for item in data:
    parts = item.split(".")
    if len(parts) >= 2:
        parent_key = ".".join(parts[:2])
    else:
        parent_key = item  # e.g. '70'

    parent_map[parent_key].append(item)

# Ensure each parent exists even if it has no children
for item in data:
    parts = item.split(".")
    if len(parts) == 2:
        parent_key = item
        parent_map[parent_key]  # triggers defaultdict

# Convert to dict if needed
result = dict(parent_map)

# Print nicely
from pprint import pprint

pprint(result)
