#!/usr/bin/env bash
export PYTHONUNBUFFERED=1
cd "/workspace/ComfyUI_3"
# source venv/bin/activate
echo "COMFYUI: Starting ComfyUI"
TCMALLOC="$(ldconfig -p | grep -Po "libtcmalloc.so.\d" | head -n 1)"
export LD_PRELOAD="${TCMALLOC}"
python main.py --listen 0.0.0.0 > "/workspace/logs/comfyui_extra.log" 2>&1 &
echo "COMFYUI: ComfyUI Started"
# deactivate
