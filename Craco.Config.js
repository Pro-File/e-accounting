const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-color": "#0a3d62",
              "@seconday-color": "#0a3d62",
              "@heading-color": "#1D1C1C",
              "@text-color": "#929292",
              "@text-color-secondary": "#1D1C1C",
              "@font-family": "Dosis_Regular",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
