-- Remove tables if they exist
DROP TABLE IF EXISTS experiment;
DROP TABLE IF EXISTS subject;
DROP TABLE IF EXISTS sample;
DROP TABLE IF EXISTS observation;
DROP TABLE IF EXISTS experiment_custom_attributes;
DROP TABLE IF EXISTS subject_custom_attributes;
DROP TABLE IF EXISTS sample_custom_attributes;
DROP TABLE IF EXISTS observation_custom_attributes;
DROP TABLE IF EXISTS experiment_custom;
DROP TABLE IF EXISTS subject_custom;
DROP TABLE IF EXISTS sample_custom;
DROP TABLE IF EXISTS observation_custom;

-- Create core tables
CREATE TABLE experiment (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    start_date TEXT,
    end_date TEXT
);

CREATE TABLE subject (
    id INTEGER PRIMARY KEY AUTOINCREMENT
);

CREATE TABLE sample (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    start TEXT,
    end TEXT,
    note TEXT,
    experiment_id INTEGER,
    subject_id INTEGER,
    FOREIGN KEY (experiment_id) REFERENCES experiment(id),
    FOREIGN KEY (subject_id) REFERENCES subject(id)
);

CREATE TABLE observation (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    start TEXT,
    end TEXT,
    note TEXT,
    sample_id INTEGER,
    subject_id INTEGER,
    FOREIGN KEY (sample_id) REFERENCES sample(id),
    FOREIGN KEY (subject_id) REFERENCES subject(id)
);

-- Custom attributes for experiments
CREATE TABLE experiment_custom_attributes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    type TEXT,
    experiment_id INTEGER,
    FOREIGN KEY (experiment_id) REFERENCES experiment(id)
);

-- Custom attributes for subjects
CREATE TABLE subject_custom_attributes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    type TEXT,
    experiment_id INTEGER,
    FOREIGN KEY (experiment_id) REFERENCES experiment(id)
);

-- Custom attributes for samples
CREATE TABLE sample_custom_attributes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    type TEXT,
    experiment_id INTEGER,
    FOREIGN KEY (experiment_id) REFERENCES experiment(id)
);

-- Custom attributes for observations
CREATE TABLE observation_custom_attributes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    type TEXT,
    experiment_id INTEGER,
    FOREIGN KEY (experiment_id) REFERENCES experiment(id)
);

-- Tables to store custom attribute values
CREATE TABLE experiment_custom (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    value TEXT,
    custom_attributes_id INTEGER,
    experiment_id INTEGER,
    FOREIGN KEY (experiment_id) REFERENCES experiment(id),
    FOREIGN KEY (custom_attributes_id) REFERENCES experiment_custom_attributes(id)
);

CREATE TABLE subject_custom (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    value TEXT,
    custom_attributes_id INTEGER,
    subject_id INTEGER,
    FOREIGN KEY (custom_attributes_id) REFERENCES subject_custom_attributes(id),
    FOREIGN KEY (subject_id) REFERENCES subject(id)
);

CREATE TABLE sample_custom (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    value TEXT,
    custom_attributes_id INTEGER,
    sample_id INTEGER,
    FOREIGN KEY (custom_attributes_id) REFERENCES sample_custom_attributes(id),
    FOREIGN KEY (sample_id) REFERENCES sample(id)
);

CREATE TABLE observation_custom (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    value TEXT,
    custom_attributes_id INTEGER,
    observation_id INTEGER,
    FOREIGN KEY (custom_attributes_id) REFERENCES observation_custom_attributes(id),
    FOREIGN KEY (observation_id) REFERENCES observation(id)
);