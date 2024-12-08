-- Insert mock data into experiment table
INSERT INTO experiment (experiment_id) VALUES
(1),
(2),
(3);

-- Insert mock data into subject table
INSERT INTO subject (subject_id, experiment_id) VALUES
(1, 1),
(2, 1),
(3, 2),
(4, 2),
(5, 3);

-- Insert mock data into sample table
INSERT INTO sample (sample_id, experiment_id, subject_id) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 2, 3),
(4, 2, 4),
(5, 3, 5);

-- Insert mock data into observation table
INSERT INTO observation (observation_id, sample_id) VALUES
(1, 1),
(2, 1),
(3, 2),
(4, 3),
(5, 4);

-- Insert mock data into experiment_attributes table
INSERT INTO experiment_attributes (experiment_attributes_id, name, label, type, custom, autofill, required, min, max, choices, default_value, experiment_id) VALUES
(1, 'name', 'Name', 'string', 0, 0, 0, NULL, NULL, NULL, NULL, 1),
(2, 'creation_date', 'Creation Date', 'string', 0, 0, 0, NULL, NULL, NULL, NULL, 1),
(3, 'name', 'Name', 'string', 0, 0, 0, NULL, NULL, NULL, NULL, 2),
(4, 'creation_date', 'Creation Date', 'string', 0, 0, 0, NULL, NULL, NULL, NULL, 2),
(5, 'name', 'Name', 'string', 0, 0, 0, NULL, NULL, NULL, NULL, 3),
(6, 'creation_date', 'Creation Date', 'string', 0, 0, 0, NULL, NULL, NULL, NULL, 3);

-- Insert mock data into sample_attributes table
INSERT INTO sample_attributes (sample_attributes_id, name, label, type, custom, autofill, required, min, max, choices, default_value, experiment_id) VALUES
(1, 'start', 'Start', 'string', 0, 0, 0, NULL, NULL, NULL, NULL, 1),
(2, 'end', 'End', 'string', 0, 0, 0, NULL, NULL, NULL, NULL, 1),
(3, 'start', 'Start', 'string', 0, 0, 0, NULL, NULL, NULL, NULL, 2),
(4, 'end', 'End', 'string', 0, 0, 0, NULL, NULL, NULL, NULL, 2),
(5, 'start', 'Start', 'string', 0, 0, 0, NULL, NULL, NULL, NULL, 3),
(6, 'end', 'End', 'string', 0, 0, 0, NULL, NULL, NULL, NULL, 3),
(7, 'group', 'Group', 'string', 1, 0, 0, NULL, NULL, NULL, NULL, 1),
(8, 'location', 'Location', 'string', 1, 0, 0, NULL, NULL, NULL, NULL, 2);

-- Insert mock data into observation_attributes table
INSERT INTO observation_attributes (observation_attributes_id, name, label, type, custom, autofill, required, min, max, choices, default_value, experiment_id) VALUES
(1, 'start', 'Start', 'string', 0, 0, 0, NULL, NULL, NULL, NULL, 1),
(2, 'end', 'End', 'string', 0, 0, 0, NULL, NULL, NULL, NULL, 1),
(3, 'start', 'Start', 'string', 0, 0, 0, NULL, NULL, NULL, NULL, 2),
(4, 'end', 'End', 'string', 0, 0, 0, NULL, NULL, NULL, NULL, 2),
(5, 'start', 'Start', 'string', 0, 0, 0, NULL, NULL, NULL, NULL, 3),
(6, 'end', 'End', 'string', 0, 0, 0, NULL, NULL, NULL, NULL, 3),
(7, 'behavior', 'Behavior', 'string', 1, 0, 0, NULL, NULL, NULL, NULL, 1),
(8, 'notes', 'Notes', 'string', 1, 0, 0, NULL, NULL, NULL, NULL, 2),
(9, 'subject', 'Subject', 'string', 1, 0, 0, NULL, NULL, NULL, NULL, 1);

-- Insert mock data into subject_attributes table
INSERT INTO subject_attributes (subject_attributes_id, name, label, type, custom, autofill, required, min, max, choices, default_value, experiment_id) VALUES
(1, 'name', 'Name', 'string', 0, 0, 0, NULL, NULL, NULL, NULL, 1),
(2, 'name', 'Name', 'string', 0, 0, 0, NULL, NULL, NULL, NULL, 2),
(3, 'name', 'Name', 'string', 0, 0, 0, NULL, NULL, NULL, NULL, 3),
(4, 'age', 'Age', 'number', 1, 0, 0, NULL, NULL, NULL, NULL, 1),
(5, 'gender', 'Gender', 'string', 1, 0, 0, NULL, NULL, NULL, NULL, 2),
(6, 'weight', 'Weight', 'number', 1, 0, 0, NULL, NULL, NULL, NULL, 3);

-- Insert mock data into experiment_attribute_values table
INSERT INTO experiment_attribute_values (experiment_attribute_values_id, attribute_id, value) VALUES
(1, 1, 'Experiment 1'),
(2, 2, '2023-01-01 00:00:00'),
(3, 3, 'Experiment 2'),
(4, 4, '2023-02-01 00:00:00'),
(5, 5, 'Experiment 3'),
(6, 6, '2023-03-01 00:00:00');

-- Insert mock data into sample_attribute_values table
INSERT INTO sample_attribute_values (sample_attribute_values_id, attribute_id, value) VALUES
(1, 1, '2023-01-01 08:00:00'),
(2, 2, '2023-01-01 10:00:00'),
(3, 3, '2023-02-01 08:00:00'),
(4, 4, '2023-02-01 10:00:00'),
(5, 5, '2023-03-01 08:00:00'),
(6, 6, '2023-03-01 10:00:00'),
(7, 7, 'Group A'),
(8, 8, 'Location 1');

-- Insert mock data into observation_attribute_values table
INSERT INTO observation_attribute_values (observation_attribute_values_id, attribute_id, value) VALUES
(1, 1, '2023-01-01 08:30:00'),
(2, 2, '2023-01-01 09:00:00'),
(3, 3, '2023-02-01 08:30:00'),
(4, 4, '2023-02-01 09:00:00'),
(5, 5, '2023-03-01 08:30:00'),
(6, 6, '2023-03-01 09:00:00'),
(7, 7, 'Foraging'),
(8, 8, 'Observed near water source'),
(9, 9, 'Subject 1');

-- Insert mock data into subject_attribute_values table
INSERT INTO subject_attribute_values (subject_attribute_values_id, attribute_id, value) VALUES
(1, 1, 'Subject 1'),
(2, 2, 'Subject 2'),
(3, 3, 'Subject 3'),
(4, 4, '5'),
(5, 5, 'Male'),
(6, 6, '70.0');