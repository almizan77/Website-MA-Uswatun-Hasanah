import re

with open("/tmp/share.html", "r", encoding="utf-8", errors="ignore") as f:
    content = f.read()

titles = re.findall(r"<title>(.*?)</title>", content, re.I)
print("Title:", titles)

urls = set(re.findall(r"https?://[^\s\"\'<>\\]+", content))
for u in sorted(urls):
    if not any(k in u for k in ["gstatic", "google.com/xjs", "w3.org", "google.com/client_204", "csp.withgoogle"]):
        print("URL:", u)

# Check if there are base64 images
b64s = re.findall(r"data:image/[^;]+;base64,[A-Za-z0-9+/=]+", content)
print("Found base64 images:", len(b64s))
for i, b in enumerate(b64s):
    print(f"Image {i}: length {len(b)}")

# Let's also see any plain text or queries
queries = re.findall(r"q=([^&\"\'\s]+)", content)
print("Queries:", queries[:10])
