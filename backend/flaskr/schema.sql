-- Remove tables if they exist
DROP TABLE IF EXISTS experiment;
DROP TABLE IF EXISTS subject;
DROP TABLE IF EXISTS sample;
DROP TABLE IF EXISTS observation;
DROP TABLE IF EXISTS experiment_attributes;
DROP TABLE IF EXISTS subject_attributes;
DROP TABLE IF EXISTS sample_attributes;
DROP TABLE IF EXISTS observation_attributes;
DROP TABLE IF EXISTS experiment_attribute_values;
DROP TABLE IF EXISTS sample_attribute_values;
DROP TABLE IF EXISTS observation_attribute_values;
DROP TABLE IF EXISTS subject_attribute_values;

-- Create core tables
CREATE TABLE experiment (
    experiment_id INTEGER PRIMARY KEY AUTOINCREMENT
);

CREATE TABLE subject (
    subject_id INTEGER PRIMARY KEY AUTOINCREMENT,
    experiment_id INTEGER,
    FOREIGN KEY (experiment_id) REFERENCES experiment(experiment_id) ON DELETE CASCADE
);

CREATE TABLE sample (
    sample_id INTEGER PRIMARY KEY AUTOINCREMENT,
    experiment_id INTEGER,
    subject_id INTEGER,
    FOREIGN KEY (experiment_id) REFERENCES experiment(experiment_id) ON DELETE CASCADE,
    FOREIGN KEY (subject_id) REFERENCES subject(subject_id)
);

CREATE TABLE observation (
    observation_id INTEGER PRIMARY KEY AUTOINCREMENT,
    sample_id INTEGER,
    FOREIGN KEY (sample_id) REFERENCES sample(sample_id) ON DELETE CASCADE
);

-- Attribute description tables
CREATE TABLE experiment_attributes (
    experiment_attributes_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    type TEXT,
    custom BOOLEAN DEFAULT 0,
    autofill BOOLEAN DEFAULT 0,
    experiment_id INTEGER,
    FOREIGN KEY (experiment_id) REFERENCES experiment(experiment_id) ON DELETE CASCADE
);

CREATE TABLE sample_attributes (
    sample_attributes_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    type TEXT,
    custom BOOLEAN DEFAULT 0,
    autofill BOOLEAN DEFAULT 0,
    experiment_id INTEGER,
    FOREIGN KEY (experiment_id) REFERENCES experiment(experiment_id) ON DELETE CASCADE
);

CREATE TABLE observation_attributes (
    observation_attributes_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    type TEXT,
    custom BOOLEAN DEFAULT 0,
    autofill BOOLEAN DEFAULT 0,
    experiment_id INTEGER,
    FOREIGN KEY (experiment_id) REFERENCES experiment(experiment_id) ON DELETE CASCADE
);

CREATE TABLE subject_attributes (
    subject_attributes_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    type TEXT,
    custom BOOLEAN DEFAULT 0,
    autofill BOOLEAN DEFAULT 0,
    experiment_id INTEGER,
    FOREIGN KEY (experiment_id) REFERENCES experiment(experiment_id) ON DELETE CASCADE
);

-- Attribute value tables
CREATE TABLE experiment_attribute_values (
    experiment_attribute_values_id INTEGER PRIMARY KEY AUTOINCREMENT,
    attribute_id INTEGER,
    value TEXT,
    FOREIGN KEY (attribute_id) REFERENCES experiment_attributes(experiment_attributes_id) ON DELETE CASCADE
);

CREATE TABLE sample_attribute_values (
    sample_attribute_values_id INTEGER PRIMARY KEY AUTOINCREMENT,
    attribute_id INTEGER,
    value TEXT,
    FOREIGN KEY (attribute_id) REFERENCES sample_attributes(sample_attributes_id) ON DELETE CASCADE
);

CREATE TABLE observation_attribute_values (
    observation_attribute_values_id INTEGER PRIMARY KEY AUTOINCREMENT,
    attribute_id INTEGER,
    value TEXT,
    FOREIGN KEY (attribute_id) REFERENCES observation_attributes(observation_attributes_id) ON DELETE CASCADE
);

CREATE TABLE subject_attribute_values (
    subject_attribute_values_id INTEGER PRIMARY KEY AUTOINCREMENT,
    attribute_id INTEGER,
    value TEXT,
    FOREIGN KEY (attribute_id) REFERENCES subject_attributes(subject_attributes_id) ON DELETE CASCADE
);