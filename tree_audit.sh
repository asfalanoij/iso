#!/usr/bin/env bash

# ================================
# tree_audit.sh
# Generate tree -a like structure | Powershell, for ISO 2025 data catalog
# ================================

ROOT="${1:-$(pwd)}"
OUTFILE="${2:-tree_output.txt}"
MAX_DEPTH="${3:-0}"   # 0 = unlimited

# ---- helpers ----

print_tree() {
  local dir="$1"
  local prefix="$2"
  local depth="$3"

  # Depth control
  if [[ "$MAX_DEPTH" -ne 0 && "$depth" -gt "$MAX_DEPTH" ]]; then
    return
  fi

  # Read items (including hidden), exclude . and ..
  mapfile -t items < <(ls -A "$dir" 2>/dev/null | sort)

  local count=${#items[@]}
  local index=0

  for item in "${items[@]}"; do
    ((index++))
    local full="$dir/$item"

    # Choose connector
    if [[ $index -eq $count ]]; then
      connector="└── "
      new_prefix="${prefix}    "
    else
      connector="├── "
      new_prefix="${prefix}│   "
    fi

    # Detect long path (OneDrive risk)
    if [[ ${#full} -gt 180 ]]; then
      flag=" ⚠LONG_PATH"
    else
      flag=""
    fi

    if [[ -d "$full" ]]; then
      echo "${prefix}${connector}[${item}]${flag}" >> "$OUTFILE"
      print_tree "$full" "$new_prefix" $((depth + 1))
    else
      size=$(du -k "$full" 2>/dev/null | cut -f1)
      echo "${prefix}${connector}${item} (${size}KB)${flag}" >> "$OUTFILE"
    fi
  done
}

# ---- run ----

echo "[$(basename "$ROOT")]" > "$OUTFILE"
print_tree "$ROOT" "" 1

echo "✅ Tree exported to $OUTFILE"