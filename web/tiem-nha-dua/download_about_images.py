import os
import requests
from pathlib import Path

def download_image(url, filename):
    try:
        response = requests.get(url, stream=True)
        response.raise_for_status()
        
        # Create directories if they don't exist
        os.makedirs(os.path.dirname(filename), exist_ok=True)
        
        with open(filename, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                f.write(chunk)
        print(f"Successfully downloaded {filename}")
        return True
    except Exception as e:
        print(f"Error downloading {filename}: {e}")
        return False

# Image URLs
about_images = {
    "store-front": "https://images.unsplash.com/photo-1631199003193-b9d3800c3f92?w=800&auto=format&fit=crop",  # Modern beauty store front
}

team_images = {
    "member1": "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&auto=format&fit=crop",  # Professional woman CEO
    "member2": "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=400&auto=format&fit=crop",  # Beauty consultant
    "member3": "https://images.unsplash.com/photo-1573497019236-17f8177b81e8?w=400&auto=format&fit=crop",  # Customer service
}

# Create directories
os.makedirs("images/about", exist_ok=True)
os.makedirs("images/team", exist_ok=True)

# Download about images
for name, url in about_images.items():
    filename = f"images/about/{name}.jpg"
    download_image(url, filename)

# Download team member images
for name, url in team_images.items():
    filename = f"images/team/{name}.jpg"
    download_image(url, filename) 