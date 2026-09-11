#!/bin/bash
for k in alpha beta gamma; do
  src="public/assets/mascot_${k}.jpg"
  out="public/assets/mascot_${k}_clean.png"
  
  # Generate gray alpha mask with level adjustment
  convert "$src" -colorspace Gray -level 10%,24% -blur 0x1.5 mask_${k}.png
  
  # Apply mask as opacity
  convert "$src" mask_${k}.png -alpha off -compose CopyOpacity -composite "$out"
  
  # Also copy to dist if dist exists
  if [ -d "dist/assets" ]; then
    cp "$out" "dist/assets/mascot_${k}_clean.png"
  fi
  
  echo "$k done"
done
