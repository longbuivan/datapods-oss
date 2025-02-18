# Use a lightweight Grafana base image
FROM grafana/grafana:latest

# Set environment variables for a lightweight build
# ENV GF_PATHS_PROVISIONING="/etc/grafana/provisioning"
# ENV GF_PATHS_CONFIG="/etc/grafana/grafana.ini"
#
#
ENV GF_DEFAULT_INSTANCE_NAME="railway-instance"
ENV GF_INSTALL_PLUGINS="grafana-piechart-panel,grafana-worldmap-panel,grafana-clock-panel,grafana-simple-json-datasource"
ENV GF_LOG_MODE="console"

# Expose the default Grafana port
EXPOSE 3000
