-- Remove tables if they exist	
DROP TABLE IF EXISTS experiment;
DROP TABLE IF EXISTS subject;
DROP TABLE IF EXISTS sample;
DROP TABLE IF EXISTS observation;
DROP TABLE IF EXISTS custom_attributes;
DROP TABLE IF EXISTS experiment_custom;
DROP TABLE IF EXISTS subject_custom;
DROP TABLE IF EXISTS sample_custom;
DROP TABLE IF EXISTS observation_custom;

-- Create core tables
CREATE TABLE experiment (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    start_date TEXT,
    end_date TEXT,
    status TEXT
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

-- Table to store custom attribute definitions
CREATE TABLE custom_attributes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    parent_table TEXT,
    type TEXT,
    experiment_id INTEGER,
    FOREIGN KEY (experiment_id) REFERENCES experiment(id)
);

-- Tables to store custom attribute values
CREATE TABLE experiment_custom (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    type TEXT,
    value TEXT,
    experiment_id INTEGER,
    FOREIGN KEY (experiment_id) REFERENCES experiment(id)
);

CREATE TABLE subject_custom (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    type TEXT,
    value TEXT,
    experiment_id INTEGER,
    FOREIGN KEY (experiment_id) REFERENCES experiment(id)
);

CREATE TABLE sample_custom (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    type TEXT,
    value TEXT,
    experiment_id INTEGER,
    FOREIGN KEY (experiment_id) REFERENCES experiment(id)
);

CREATE TABLE observation_custom (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    type TEXT,
    value TEXT,
    experiment_id INTEGER,
    FOREIGN KEY (experiment_id) REFERENCES experiment(id)
);
