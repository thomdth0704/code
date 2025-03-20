import os
import requests
from urllib.parse import urlparse

def download_image(url, filename):
    try:
        response = requests.get(url)
        if response.status_code == 200:
            with open(filename, 'wb') as f:
                f.write(response.content)
            print(f"Downloaded: {filename}")
        else:
            print(f"Failed to download: {filename}")
    except Exception as e:
        print(f"Error downloading {filename}: {str(e)}")

# Create directories if they don't exist
os.makedirs("images", exist_ok=True)
os.makedirs("images/products", exist_ok=True)

# Image URLs from Unsplash with updated links
images = {
    "banner1.jpg": "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1200",
    "makeup.jpg": "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800",  # Updated makeup image
    "skincare.jpg": "https://images.unsplash.com/photo-1570554886111-e80fcca6a029?w=800",
    "perfume.jpg": "https://images.unsplash.com/photo-1592842232655-e5d345cbc2d0?w=800",
    "accessories.jpg": "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800"
}

product_images = {
    # Makeup products
    "mac-ruby-woo.jpg": "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=800",
    "3ce-mood.jpg": "https://images.unsplash.com/photo-1631730359585-38a4935cbec4?w=800",
    "maybelline-mascara.jpg": "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800",  # Updated mascara image
    "loreal-palette.jpg": "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800",
    
    # Skincare products
    "laneige-cream.jpg": "https://images.unsplash.com/photo-1580870069867-74c57ee1bb07?w=800",
    "ordinary-serum.jpg": "https://images.unsplash.com/photo-1576426863848-c21f53c60b19?w=800",
    "anessa-sunscreen.jpg": "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800",
    "innisfree-toner.jpg": "https://images.unsplash.com/photo-1570554886111-e80fcca6a029?w=800",  # Updated toner image
    
    # Perfume products
    "miss-dior.jpg": "https://images.unsplash.com/photo-1541643600914-78b084683601?w=800",
    "gucci-bloom.jpg": "https://images.unsplash.com/photo-1592842232655-e5d345cbc2d0?w=800",
    "black-opium.jpg": "https://images.unsplash.com/photo-1541643600914-78b084683601?w=800",  # Updated perfume image
    "chanel-n5.jpg": "https://images.unsplash.com/photo-1541643600914-78b084683601?w=800",
    
    # Accessories products
    "rt-brush-set.jpg": "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800",
    "beauty-blender.jpg": "https://images.unsplash.com/photo-1599305090598-fe179d501227?w=800",
    "led-mirror.jpg": "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=800",
    "makeup-bag.jpg": "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800"
}

# Download main images
for filename, url in images.items():
    download_image(url, os.path.join("images", filename))

# Download product images
for filename, url in product_images.items():
    download_image(url, os.path.join("images/products", filename)) 