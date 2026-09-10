from PIL import Image
import sys

def remove_white_bg(input_path, output_path, tolerance=50):
    img = Image.open(input_path).convert("RGBA")
    datas = img.getdata()

    newData = []
    for item in datas:
        # Check if pixel is close to white
        if item[0] >= 255 - tolerance and item[1] >= 255 - tolerance and item[2] >= 255 - tolerance:
            newData.append((255, 255, 255, 0)) # Transparent
        else:
            newData.append(item)

    img.putdata(newData)
    
    # Optionally enhance the image (sharpening)
    from PIL import ImageEnhance, ImageFilter
    img = img.filter(ImageFilter.UnsharpMask(radius=2, percent=150, threshold=3))
    
    img.save(output_path, "PNG")
    print("Background removed and image saved to", output_path)

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python remove_bg.py <input> <output>")
    else:
        remove_white_bg(sys.argv[1], sys.argv[2])
