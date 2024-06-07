-- Schema: lnd
CREATE SCHEMA lnd;

-- Table: lnd.customer_events
CREATE TABLE lnd.customer_events (
    event_id INT PRIMARY KEY,
    customer_id INT,
    event_type VARCHAR(50),
    event_date DATE,
    event_data JSONB
);

-- Schema: stg
CREATE SCHEMA stg;

-- Table: stg.customer_events_raw
CREATE TABLE stg.customer_events_raw (
    event_id INT PRIMARY KEY,
    customer_id INT,
    event_type VARCHAR(50),
    event_date DATE,
    event_data JSONB
);

-- Table: stg.customer_events_cleaned
CREATE TABLE stg.customer_events_cleaned (
    event_id INT PRIMARY KEY,
    customer_id INT,
    event_type VARCHAR(50),
    event_date DATE,
    event_data JSONB
);

-- Schema: dw
CREATE SCHEMA dw;


-- Fact Table: dw.customer_behavior_fact
CREATE TABLE dw.customer_behavior_fact (
    customer_id INT PRIMARY KEY,
    total_events INT,
    last_event_date DATE,
    favorite_event_type VARCHAR(50)
);

-- Dimension Table: dw.product_dim
CREATE TABLE dw.product_dim (
    product_id INT PRIMARY KEY,
    product_name VARCHAR(50),
    -- Add other product attributes as needed
);

-- Dimension Table: dw.customer_dim
CREATE TABLE dw.customer_dim (
    customer_id INT PRIMARY KEY,
    customer_name VARCHAR(50),
    -- Add other customer attributes as needed
);

-- Dimension Table: dw.location_dim
CREATE TABLE dw.location_dim (
    location_id INT PRIMARY KEY,
    location_name VARCHAR(50),
    -- Add other location attributes as needed
);

-- Dimension Table: dw.date_dim
CREATE TABLE dw.date_dim (
    date_id INT PRIMARY KEY,
    date_value DATE,
    -- Add other date attributes as needed
);