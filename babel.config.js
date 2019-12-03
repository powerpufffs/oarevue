module.exports = 

  {
    "presets": [
        ["env", { "modules": false }]
    ],
    "env": {
        "test": {
        "presets": [
                ["env", { "targets": { "node": "current" }}]
            ]
        }
    }
}

  // presets: [
  //   '@vue/app'
  // ]