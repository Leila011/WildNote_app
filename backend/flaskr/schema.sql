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
    experiment_id INTEGER PRIMARY KEY AUTOINCREMENT,
    status TEXT DEFAULT 'draft',
    timestamp_start TIMESTAMP,
    timestamp_end TIMESTAMP,
    predefine_subject BOOLEAN DEFAULT 0,
    name TEXT,
    duration INTEGER DEFAULT 0,
    samples_number_goal INTEGER,
    samples_time_goal INTEGER, 
    obs_number_goal INTEGER,
    obs_time_goal INTEGER
);

CREATE TABLE subject (
    subject_id INTEGER PRIMARY KEY AUTOINCREMENT,
    timestamp_creation TIMESTAMP NOT NULL,
    name TEXT NOT NULL, 
    experiment_id INTEGER,
    FOREIGN KEY (experiment_id) REFERENCES experiment(experiment_id) ON DELETE CASCADE
);

CREATE TABLE sample (
    sample_id INTEGER PRIMARY KEY AUTOINCREMENT,
    experiment_id INTEGER,
    subject_id INTEGER NULL,
    status TEXT DEFAULT 'active',
    timestamp_start TIMESTAMP,
    timestamp_end TIMESTAMP,
    FOREIGN KEY (experiment_id) REFERENCES experiment(experiment_id) ON DELETE CASCADE,
    FOREIGN KEY (subject_id) REFERENCES subject(subject_id) ON DELETE CASCADE
);

CREATE TABLE observation (
    observation_id INTEGER PRIMARY KEY AUTOINCREMENT,
    sample_id INTEGER,
    status TEXT DEFAULT 'active',
    timestamp_start TIMESTAMP,
    timestamp_end TIMESTAMP,
    FOREIGN KEY (sample_id) REFERENCES sample(sample_id) ON DELETE CASCADE
);

-- Create attribute tables
CREATE TABLE experiment_attributes (
    experiment_attributes_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    label TEXT,
    type TEXT,
    custom BOOLEAN,
    autofill BOOLEAN,
    required BOOLEAN,
    min INTEGER,
    max INTEGER,
    choices TEXT,
    default_value TEXT,
    experiment_id INTEGER,
    FOREIGN KEY (experiment_id) REFERENCES experiment(experiment_id) ON DELETE CASCADE
);

CREATE TABLE subject_attributes (
    subject_attributes_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    label TEXT,
    type TEXT,
    custom BOOLEAN,
    autofill BOOLEAN,
    required BOOLEAN,
    min INTEGER,
    max INTEGER,
    choices TEXT,
    default_value TEXT,
    experiment_id INTEGER,
    FOREIGN KEY (experiment_id) REFERENCES experiment(experiment_id) ON DELETE CASCADE
);

CREATE TABLE sample_attributes (
    sample_attributes_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    label TEXT,
    type TEXT,
    custom BOOLEAN,
    autofill BOOLEAN,
    required BOOLEAN,
    min INTEGER,
    max INTEGER,
    choices TEXT,
    default_value TEXT,
    experiment_id INTEGER,
    FOREIGN KEY (experiment_id) REFERENCES experiment(experiment_id) ON DELETE CASCADE
);

CREATE TABLE observation_attributes (
    observation_attributes_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    label TEXT,
    type TEXT,
    custom BOOLEAN,
    autofill BOOLEAN,
    required BOOLEAN,
    min INTEGER,
    max INTEGER,
    choices TEXT,
    default_value TEXT,
    experiment_id INTEGER,
    FOREIGN KEY (experiment_id) REFERENCES experiment(experiment_id) ON DELETE CASCADE
);

-- Create attribute value tables
CREATE TABLE experiment_attribute_values (
    experiment_attribute_values_id INTEGER PRIMARY KEY AUTOINCREMENT,
    attribute_id INTEGER,
    experiment_id INTEGER,
    value TEXT,
    FOREIGN KEY (attribute_id) REFERENCES experiment_attributes(experiment_attributes_id) ON DELETE CASCADE,
    FOREIGN KEY (experiment_id) REFERENCES experiment(experiment_id) ON DELETE CASCADE
);

CREATE TABLE sample_attribute_values (
    sample_attribute_values_id INTEGER PRIMARY KEY AUTOINCREMENT,
    attribute_id INTEGER,
    sample_id INTEGER,
    value TEXT,
    FOREIGN KEY (attribute_id) REFERENCES sample_attributes(sample_attributes_id) ON DELETE CASCADE,
    FOREIGN KEY (sample_id) REFERENCES sample(sample_id) ON DELETE CASCADE
);

CREATE TABLE observation_attribute_values (
    observation_attribute_values_id INTEGER PRIMARY KEY AUTOINCREMENT,
    attribute_id INTEGER,
    observation_id INTEGER,
    value TEXT,
    FOREIGN KEY (attribute_id) REFERENCES observation_attributes(observation_attributes_id) ON DELETE CASCADE,
    FOREIGN KEY (observation_id) REFERENCES observation(observation_id) ON DELETE CASCADE
);

CREATE TABLE subject_attribute_values (
    subject_attribute_values_id INTEGER PRIMARY KEY AUTOINCREMENT,
    attribute_id INTEGER,
    subject_id INTEGER,
    value TEXT,
    FOREIGN KEY (attribute_id) REFERENCES subject_attributes(subject_attributes_id) ON DELETE CASCADE,
    FOREIGN KEY (subject_id) REFERENCES subject(subject_id) ON DELETE CASCADE
);