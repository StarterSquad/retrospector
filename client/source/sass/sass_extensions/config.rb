Encoding.default_external = "UTF-8"

require 'yaml'

module SassExtensions::Config

  @defaults = {
    asset_paths: [],
    base_path: '.',
    relative_assets: false,
  }

  # Return configuration defaults
  def self.defaults
    @defaults
  end

  # Return asset load paths
  def self.asset_paths
    @asset_paths
  end

  # Return asset base path
  def self.base_path
    @base_path
  end

  # Load configuration from the named YAML file
  def self.load_yaml(filename)
    config = YAML.load_file(filename)
    @defaults.merge(config).each do |key, value|
      instance_variable_set(:"@#{ key }", value)
    end
    @asset_paths << '.'
  end
end

SassExtensions::Config.load_yaml('config.yml')
