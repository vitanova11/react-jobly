// this configuration tells jest to mock CSS files using 'identity-obj-proxy'. This module will return classnames as they are, which should allow your tests to run without errors related to CSS imports.
module.exports = {
    // Other Jest configurations...
    moduleNameMapper: {
      "\\.(css|less|scss|sass)$": "identity-obj-proxy"
    }
  };