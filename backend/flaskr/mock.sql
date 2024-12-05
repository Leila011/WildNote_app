-- Insert mock data into experiment table
INSERT INTO experiment (name, start_date, end_date) VALUES
('Experiment 1', '2024-01-01', '2024-01-10'),
('Experiment 2', '2024-02-01', '2024-02-15'),
('Experiment 3', '2024-03-01', '2024-03-20');

-- Insert mock data into subject table
INSERT INTO subject (id) VALUES
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

-- Insert mock data into experiment_custom_attributes table
INSERT INTO experiment_custom_attributes (name, type, experiment_id) VALUES
('Temperature', 'float', 1),
('Humidity', 'float', 1),
('Color', 'string', 1),
('Pressure', 'float', 2),
('Light', 'float', 2),
('Sound', 'string', 2),
('Speed', 'float', 3),
('Acceleration', 'float', 3),
('Force', 'string', 3);

-- Insert mock data into experiment_custom table
INSERT INTO experiment_custom (value, custom_attributes_id, experiment_id) VALUES
('23.5', 1, 1),
('45.2', 2, 1),
('Red', 3, 1),
('101.3', 4, 2),
('500.0', 5, 2),
('Loud', 6, 2),
('60.0', 7, 3),
('9.8', 8, 3),
('Strong', 9, 3);

-- Insert mock data into subject_custom_attributes table
INSERT INTO subject_custom_attributes (name, type, experiment_id) VALUES
('Gender', 'string', 1),
('Gender', 'string', 2),
('Gender', 'string', 3),
('Gender', 'string', 4),
('Gender', 'string', 5);

-- Insert mock data into subject_custom table
INSERT INTO subject_custom (value, custom_attributes_id, subject_id) VALUES
('Male', 1, 1),
('Female', 2, 2),
('Male', 3, 3),
('Female', 4, 4),
('Non-binary', 5, 5);

-- Insert mock data into sample_custom_attributes table
INSERT INTO sample_custom_attributes (name, type, experiment_id) VALUES
('Color', 'string', 1),
('Color', 'string', 2),
('Color', 'string', 3),
('Color', 'string', 4),
('Color', 'string', 5);

-- Insert mock data into sample_custom table
INSERT INTO sample_custom (value, custom_attributes_id, sample_id) VALUES
('Red', 1, 1),
('Blue', 2, 2),
('Green', 3, 3),
('Yellow', 4, 4),
('Purple', 5, 5);

-- Insert mock data into observation_custom_attributes table
INSERT INTO observation_custom_attributes (name, type, experiment_id) VALUES
('Intensity', 'string', 1),
('Intensity', 'string', 2),
('Intensity', 'string', 3),
('Intensity', 'string', 4),
('Intensity', 'string', 5);

-- Insert mock data into observation_custom table
INSERT INTO observation_custom (value, custom_attributes_id, observation_id) VALUES
('High', 1, 1),
('Medium', 2, 2),
('Low', 3, 3),
('Medium', 4, 4),
('High', 5, 5);