# Presets

This folder contains all plugin presets.

## Files
- `synthesis-presets.json` - Synthesizer engine presets
- `sample-presets.json` - Sample-based presets
- `factory/` - Factory presets (read-only)
- `user/` - User-created presets

## Format
Presets are stored in JSON format with the following structure:

```json
{
  "id": "unique-preset-id",
  "name": "Preset Name",
  "category": "Category",
  "parameters": {
    "volume": 0.8,
    "filter": 1000,
    "envelope": {
      "attack": 0.1,
      "decay": 0.3,
      "sustain": 0.7,
      "release": 0.5
    }
  },
  "created": "2024-01-01T00:00:00.000Z",
  "author": "Mr. Mig"
}
```
