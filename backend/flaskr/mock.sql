-- Insert mock data into experiment table
INSERT INTO experiment (name, start_date, end_date) VALUES
('Experiment 1', '2024-01-01', '2024-01-10'),
('Experiment 2', '2024-02-01', '2024-02-15'),
('Experiment 3', '2024-03-01', '2024-03-20');

-- Insert mock data into subject table
INSERT INTO subject VALUES
(1),
(2),
(3),
(4),
(5);

-- Insert mock data into sample table
INSERT INTO sample (start, end, note, experiment_id, subject_id) VALUES
('2024-01-01', '2024-01-02', 'Sample 1 for Experiment 1', 1, 1),
('2024-01-02', '2024-01-03', 'Sample 2 for Experiment 1', 1, 2),
('2024-02-01', '2024-02-05', 'Sample 1 for Experiment 2', 2, 3),
('2024-02-06', '2024-02-10', 'Sample 2 for Experiment 2', 2, 4),
('2024-03-01', '2024-03-05', 'Sample 1 for Experiment 3', 3, 5);

-- Insert mock data into observation table
INSERT INTO observation (start, end, note, sample_id, subject_id) VALUES
('2024-01-01', '2024-01-01', 'Observation 1 for Sample 1', 1, 1),
('2024-01-02', '2024-01-02', 'Observation 2 for Sample 1', 1, 1),
('2024-02-01', '2024-02-02', 'Observation 1 for Sample 1', 3, 3),
('2024-02-06', '2024-02-07', 'Observation 1 for Sample 2', 4, 4),
('2024-03-01', '2024-03-02', 'Observation 1 for Sample 1', 5, 5);

-- Insert mock data into custom_attributes table
INSERT INTO custom_attributes (name, type, parent_table, experiment_id) VALUES
('Temperature', 'float', 'experiment', 1),
('Humidity', 'float', 'experiment', 2),
('Color', 'string', 'sample', 3);

-- Insert mock data into experiment_custom table
INSERT INTO experiment_custom (value, custom_attributes_id, experiment_id) VALUES
('23.5', 1, 1),
('45.2', 2, 2),
('None', 3, 3);

-- Insert mock data into subject_custom table
INSERT INTO subject_custom (value, custom_attributes_id, subject_id) VALUES
('Male', 1, 1),
('Female', 2, 2),
('Male', 1, 3),
('Female', 2, 4),
('Non-binary', 1, 5);

-- Insert mock data into sample_custom table
INSERT INTO sample_custom (value, custom_attributes_id, sample_id) VALUES
('Red', 3, 1),
('Blue', 3, 2),
('Green', 3, 3),
('Yellow', 3, 4),
('Purple', 3, 5);

-- Insert mock data into observation_custom table
INSERT INTO observation_custom (value, custom_attributes_id, observation_id) VALUES
('High', 1, 1),
('Medium', 2, 2),
('Low', 1, 3),
('Medium', 2, 4),
('High', 1, 5);
