import urllib.request
import ssl
import os

ssl._create_default_https_context = ssl._create_unverified_context

os.makedirs("images/maps", exist_ok=True)

base = "https://www.prugio.com/hb/2025/eduforet/assets/images/sub/"

maps = [
    ("environment.jpg",      "location.jpg"),
    ("environment-traffic.jpg",    "traffic.jpg"),
    ("environment-life.jpg",       "life.jpg"),
    ("environment-edu.jpg",        "education.jpg"),
    ("environment-develop.jpg",    "development.jpg"),
    ("environment-loc.jpg",        "loc.jpg"),
    ("env-loc.jpg",                "env-loc.jpg"),
    ("map-traffic.jpg",            "map-traffic.jpg"),
    ("map-life.jpg",               "map-life.jpg"),
    ("map-edu.jpg",                "map-edu.jpg"),
    ("map-develop.jpg",            "map-develop.jpg"),
]

# Try main environment page image first
urls_to_try = [
    "https://www.prugio.com/hb/2025/eduforet/assets/images/sub/environment.jpg",
    "https://www.prugio.com/hb/2025/eduforet//assets/images/sub/environment.jpg",
]

for url in urls_to_try:
    try:
        path = "images/" + url.split("/")[-1]
        urllib.request.urlretrieve(url, path)
        print(f"OK: {url} -> {path}")
    except Exception as e:
        print(f"FAIL: {url} -> {e}")

# Try numbered environment maps
for i in range(1, 6):
    for pattern in [
        f"environment-0{i}.jpg",
        f"environment{i}.jpg",
        f"env-0{i}.jpg",
        f"env0{i}.jpg",
        f"loc-0{i}.jpg",
        f"location-0{i}.jpg",
    ]:
        url = base + pattern
        try:
            path = f"images/maps/map-{i:02d}.jpg"
            urllib.request.urlretrieve(url, path)
            size = os.path.getsize(path)
            if size > 20000:
                print(f"OK ({size//1024}KB): {url} -> {path}")
            else:
                print(f"TOO SMALL ({size}B, likely placeholder): {url}")
                os.remove(path)
        except Exception as e:
            print(f"FAIL: {url}")
