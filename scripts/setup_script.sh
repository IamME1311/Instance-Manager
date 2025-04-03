#!/bin/bash

# Download flux1-dev.safetensors
aria2c -c -x 16 -s 16 --header "Authorization: Bearer ${HF_TOKEN}" \
  -d "/workspace/ComfyUI/models/unet" -o "flux1-dev.safetensors" \
  "https://huggingface.co/black-forest-labs/FLUX.1-dev/resolve/main/flux1-dev.safetensors?download=true" \
  --summary-interval=1 | grep --line-buffered "%" &

# Download flux1-fill-dev.safetensors
aria2c -c -x 16 -s 16 --header "Authorization: Bearer ${HF_TOKEN}" \
  -d "/workspace/ComfyUI/models/unet" -o "flux1-fill-dev.safetensors" \
  "https://huggingface.co/Sri2901/Flux_Models/resolve/main/flux1-fill-dev.safetensors?download=true" \
  --summary-interval=1 | grep --line-buffered "%" &

aria2c -c -x 16 -s 16 --header "Authorization: Bearer ${HF_TOKEN}" \
  -d "/workspace/ComfyUI/models/upscale_models" -o "1xDeH264_realplksr.pth" \
  "https://huggingface.co/RippleLinks/Flux_Models/resolve/main/1xDeH264_realplksr.pth?download=true" \
  --summary-interval=1 | grep --line-buffered "%"

aria2c -c -x 16 -s 16 --header "Authorization: Bearer ${HF_TOKEN}" \
  -d "/workspace/ComfyUI/models/upscale_models" -o "4xFaceUpDAT.pth" \
  "https://huggingface.co/Sri2901/Flux_Models/resolve/main/4xFaceUpDAT.pth?download=true" \
  --summary-interval=1 | grep --line-buffered "%"

aria2c -c -x 16 -s 16 --header "Authorization: Bearer ${HF_TOKEN}" \
  -d "/workspace/ComfyUI/models/upscale_models" -o "4x_NMKD-Siax_200k.pth" \
  "https://huggingface.co/Sri2901/Flux_Models/resolve/main/4x_NMKD-Siax_200k.pth?download=true" \
  --summary-interval=1 | grep --line-buffered "%"

aria2c -c -x 16 -s 16 --header "Authorization: Bearer ${HF_TOKEN}" \
  -d "/workspace/ComfyUI/models/upscale_models" -o "4x-ClearRealityV1.pth" \
  "https://huggingface.co/Sri2901/Flux_Models/resolve/main/4x-ClearRealityV1.pth?download=true" \
  --summary-interval=1 | grep --line-buffered "%"

aria2c -c -x 16 -s 16 --header "Authorization: Bearer ${HF_TOKEN}" \
  -d "/workspace/ComfyUI/models/upscale_models" -o "1xDeJPG_realplksr_otf.pth" \
  "https://huggingface.co/Sri2901/Flux_Models/resolve/main/1xDeJPG_realplksr_otf.pth?download=true" \
  --summary-interval=1 | grep --line-buffered "%"

aria2c -c -x 16 -s 16 --header "Authorization: Bearer ${HF_TOKEN}" \
  -d "/workspace/ComfyUI/models/vae" -o "ae.safetensors" \
  "https://huggingface.co/black-forest-labs/FLUX.1-dev/resolve/main/ae.safetensors?download=true" \
  --summary-interval=1 | grep --line-buffered "%"

aria2c -c -x 16 -s 16 --header "Authorization: Bearer ${HF_TOKEN}" \
  -d "/workspace/ComfyUI/models/clip" -o "t5xxl_fp8_e4m3fn.safetensors" \
  "https://huggingface.co/comfyanonymous/flux_text_encoders/resolve/main/t5xxl_fp8_e4m3fn.safetensors?download=true" \
  --summary-interval=1 | grep --line-buffered "%" &

aria2c -c -x 16 -s 16 --header "Authorization: Bearer ${HF_TOKEN}" \
  -d "/workspace/ComfyUI/models/clip" -o "ViT-L-14-TEXT-detail-improved-hiT-GmP-TE-only-HF.safetensors" \
  "https://huggingface.co/Sri2901/Flux_Models/resolve/main/ViT-L-14-TEXT-detail-improved-hiT-GmP-TE-only-HF.safetensors?download=true" \
  --summary-interval=1 | grep --line-buffered "%" &

aria2c -c -x 16 -s 16 --header "Authorization: Bearer ${HF_TOKEN}" \
  -d "/workspace/ComfyUI/models/clip_vision" -o "sigclip_vision_patch14_384.safetensors" \
  "https://huggingface.co/Sri2901/Flux_Models/resolve/main/sigclip_vision_patch14_384.safetensors?download=true" \
  --summary-interval=1 | grep --line-buffered "%"

aria2c -c -x 16 -s 16 --header "Authorization: Bearer ${HF_TOKEN}" \
  -d "/workspace/ComfyUI/models/loras" -o "amateurphoto-v6-forcu.safetensors" \
  "https://huggingface.co/Sri2901/Flux_Models/resolve/main/amateurphoto-v6-forcu.safetensors?download=true" \
  --summary-interval=1 | grep --line-buffered "%"

aria2c -c -x 16 -s 16 --header "Authorization: Bearer ${HF_TOKEN}" \
  -d "/workspace/ComfyUI/models/loras" -o "flux1-canny-dev-lora.safetensors" \
  "https://huggingface.co/Sri2901/Flux_Models/resolve/main/flux1-canny-dev-lora.safetensors?download=true" \
  --summary-interval=1 | grep --line-buffered "%" &

aria2c -c -x 16 -s 16 --header "Authorization: Bearer ${HF_TOKEN}" \
  -d "/workspace/ComfyUI/models/loras" -o "flux1-depth-dev-lora.safetensors" \
  "https://huggingface.co/Sri2901/Flux_Models/resolve/main/flux1-depth-dev-lora.safetensors?download=true" \
  --summary-interval=1 | grep --line-buffered "%"

aria2c -c -x 16 -s 16 --header "Authorization: Bearer ${HF_TOKEN}" \
  -d "/workspace/ComfyUI/models/loras" -o "skin_texture_style_v5.safetensors" \
  "https://huggingface.co/Sri2901/Flux_Models/resolve/main/skin_texture_style_v5.safetensors?download=true" \
  --summary-interval=1 | grep --line-buffered "%"

curl -L -H "Authorization: Bearer ${CIVITAI_TOKEN}" -o "/workspace/ComfyUI/models/loras/flux-lora-product-light.safetensors" "https://civitai.com/api/download/models/790057?type=Model&format=SafeTensor" &
curl -L -H "Authorization: Bearer ${CIVITAI_TOKEN}" -o "/workspace/ComfyUI/models/loras/MidJourneyXFlux.safetensors" "https://civitai.com/api/download/models/1249246?type=Model&format=SafeTensor" &

aria2c -c -x 16 -s 16 --header "Authorization: Bearer ${HF_TOKEN}" \
  -d "/workspace/ComfyUI/models/loras" -o "mjV6.safetensors" \
  "https://huggingface.co/Sri2901/Flux_Models/resolve/main/Strangerzone/mjV6.safetensors?download=true" \
  --summary-interval=1 | grep --line-buffered "%"

aria2c -c -x 16 -s 16 --header "Authorization: Bearer ${HF_TOKEN}" \
  -d "/workspace/ComfyUI/models/style_models" -o "flux1-redux-dev.safetensors" \
  "https://huggingface.co/Sri2901/Flux_Models/resolve/main/flux1-redux-dev.safetensors?download=true" \
  --summary-interval=1 | grep --line-buffered "%"

cd /workspace/ComfyUI/models/
git clone https://huggingface.co/mattmdjaga/segformer_b2_clothes
git clone https://huggingface.co/sayeed99/segformer_b3_clothes
git clone https://huggingface.co/sayeed99/segformer-b3-fashion
mv segformer-b3-fashion segformer_b3_fashio
wait  # Wait for both downloads to finish
