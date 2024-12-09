-- Insert mock data into experiment table
INSERT INTO experiment (experiment_id, status, timestamp_start, timestamp_end) VALUES
(1, 'active', '2023-01-01 08:00:00', '2023-01-01 18:00:00'),
(2, 'completed', '2023-02-01 08:00:00', '2023-02-01 18:00:00'),
(3, 'active', '2023-03-01 08:00:00', '2023-03-01 18:00:00');

-- Insert mock data into subject table
INSERT INTO subject (subject_id, experiment_id) VALUES
(1, 1),
(2, 1),
(3, 2),
(4, 2),
(5, 3);

-- Insert mock data into sample table
INSERT INTO sample (sample_id, experiment_id, subject_id, status, timestamp_start, timestamp_end) VALUES
(1, 1, 1, 'active', '2023-01-01 08:00:00', '2023-01-01 09:00:00'),
(2, 1, 2, 'completed', '2023-01-01 09:00:00', '2023-01-01 10:00:00'),
(3, 2, 3, 'active', '2023-02-01 08:00:00', '2023-02-01 09:00:00'),
(4, 2, 4, 'completed', '2023-02-01 09:00:00', '2023-02-01 10:00:00'),
(5, 3, 5, 'active', '2023-03-01 08:00:00', '2023-03-01 09:00:00');

-- Insert mock data into observation table
INSERT INTO observation (observation_id, sample_id, status, timestamp_start, timestamp_end) VALUES
(1, 1, 'active', '2023-01-01 08:30:00', '2023-01-01 09:00:00'),
(2, 1, 'completed', '2023-01-01 09:00:00', '2023-01-01 09:30:00'),
(3, 2, 'active', '2023-02-01 08:30:00', '2023-02-01 09:00:00'),
(4, 3, 'completed', '2023-02-01 09:00:00', '2023-02-01 09:30:00'),
(5, 4, 'active', '2023-03-01 08:30:00', '2023-03-01 09:00:00');

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
(8, 'notes', 'Notes', 'string', 1, 0, 0, NULL, NULL, NULL, NULL, 2);

-- Insert mock data into subject_attributes table
INSERT INTO subject_attributes (subject_attributes_id, name, label, type, custom, autofill, required, min, max, choices, default_value, experiment_id) VALUES
(1, 'name', 'Name', 'string', 0, 0, 0, NULL, NULL, NULL, NULL, 1),
(2, 'name', 'Name', 'string', 0, 0, 0, NULL, NULL, NULL, NULL, 2),
(3, 'name', 'Name', 'string', 0, 0, 0, NULL, NULL, NULL, NULL, 3),
(4, 'age', 'Age', 'number', 1, 0, 0, NULL, NULL, NULL, NULL, 1),
(5, 'gender', 'Gender', 'string', 1, 0, 0, NULL, NULL, NULL, NULL, 2),
(6, 'weight', 'Weight', 'number', 1, 0, 0, NULL, NULL, NULL, NULL, 3);

-- Insert mock data into experiment_attribute_values table
INSERT INTO experiment_attribute_values (experiment_attribute_values_id, attribute_id, experiment_id, value) VALUES
(1, 1, 1, 'Experiment 1'),
(2, 2, 1, '2023-01-01'),
(3, 3, 2, 'Experiment 2'),
(4, 4, 2, '2023-02-01'),
(5, 5, 3, 'Experiment 3'),
(6, 6, 3, '2023-03-01');

-- Insert mock data into sample_attribute_values table
INSERT INTO sample_attribute_values (sample_attribute_values_id, attribute_id, sample_id, value) VALUES
(1, 1, 1, '2023-01-01 08:00:00'),
(2, 2, 1, '2023-01-01 09:00:00'),
(3, 3, 2, '2023-02-01 08:00:00'),
(4, 4, 2, '2023-02-01 09:00:00'),
(5, 5, 3, '2023-03-01 08:00:00'),
(6, 6, 3, '2023-03-01 09:00:00'),
(7, 7, 1, 'Group A'),
(8, 8, 2, 'Location X');

-- Insert mock data into observation_attribute_values table
INSERT INTO observation_attribute_values (observation_attribute_values_id, attribute_id, observation_id, value) VALUES
(1, 1, 1, '2023-01-01 08:30:00'),
(2, 2, 1, '2023-01-01 09:00:00'),
(3, 3, 2, '2023-02-01 08:30:00'),
(4, 4, 2, '2023-02-01 09:00:00'),
(5, 5, 3, 'Foraging'),
(6, 6, 3, 'Observed near water source'),
(7, 7, 4, 'Behavioral observation'),
(8, 8, 4, 'Notes for observation 4');

-- Insert mock data into subject_attribute_values table
INSERT INTO subject_attribute_values (subject_attribute_values_id, attribute_id, subject_id, value) VALUES
(1, 1, 1, 'Subject 1'),
(2, 2, 2, 'Subject 2'),
(3, 3, 3, 'Subject 3'),
(4, 4, 4, '25'),
(5, 5, 5, 'Male'),
(6, 6, 6, '70.0');

-- For observation 201
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 201, 'Female'),
(2, 201, '3'),
(3, 201, 'good'),
(4, 201, 'adult'),
(5, 201, 'Aggressive level 3'),
(6, 201, 'true');

-- For observation 202
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 202, 'Male'),
(2, 202, '1'),
(3, 202, 'good'),
(4, 202, 'teenage'),
(5, 202, 'Physical contact'),
(6, 202, 'false');

-- For observation 203
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 203, 'Female'),
(2, 203, '2'),
(3, 203, 'good'),
(4, 203, 'child'),
(5, 203, 'Aggressive level 1'),
(6, 203, 'true');

-- For observation 204
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 204, 'Male'),
(2, 204, '3'),
(3, 204, 'good'),
(4, 204, 'adult'),
(5, 204, 'Aggressive level 2'),
(6, 204, 'false');

-- For observation 205
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 205, 'Female'),
(2, 205, '1'),
(3, 205, 'good'),
(4, 205, 'teenage'),
(5, 205, 'Aggressive level 3'),
(6, 205, 'true');

-- For observation 206
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 206, 'Male'),
(2, 206, '2'),
(3, 206, 'injured'),
(4, 206, 'child'),
(5, 206, 'Physical contact'),
(6, 206, 'false');

-- For observation 207
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 207, 'Female'),
(2, 207, '3'),
(3, 207, 'good'),
(4, 207, 'adult'),
(5, 207, 'Aggressive level 1'),
(6, 207, 'true');

-- For observation 208
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 208, 'Male'),
(2, 208, '1'),
(3, 208, 'good'),
(4, 208, 'teenage'),
(5, 208, 'Aggressive level 2'),
(6, 208, 'false');

-- For observation 209
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 209, 'Female'),
(2, 209, '2'),
(3, 209, 'good'),
(4, 209, 'child'),
(5, 209, 'Aggressive level 3'),
(6, 209, 'true');

-- For observation 210
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 210, 'Male'),
(2, 210, '3'),
(3, 210, 'good'),
(4, 210, 'adult'),
(5, 210, 'Physical contact'),
(6, 210, 'false');

-- For observation 211
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 211, 'Female'),
(2, 211, '1'),
(3, 211, 'good'),
(4, 211, 'teenage'),
(5, 211, 'Aggressive level 1'),
(6, 211, 'true');

-- For observation 212
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 212, 'Male'),
(2, 212, '2'),
(3, 212, 'good'),
(4, 212, 'child'),
(5, 212, 'Aggressive level 2'),
(6, 212, 'false');

-- For observation 213
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 213, 'Female'),
(2, 213, '3'),
(3, 213, 'good'),
(4, 213, 'adult'),
(5, 213, 'Aggressive level 3'),
(6, 213, 'true');

-- For observation 214
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 214, 'Male'),
(2, 214, '1'),
(3, 214, 'injured'),
(4, 214, 'teenage'),
(5, 214, 'Physical contact'),
(6, 214, 'false');

-- For observation 215
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 215, 'Female'),
(2, 215, '2'),
(3, 215, 'good'),
(4, 215, 'child'),
(5, 215, 'Aggressive level 1'),
(6, 215, 'true');

-- For observation 216
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 216, 'Male'),
(2, 216, '3'),
(3, 216, 'good'),
(4, 216, 'adult'),
(5, 216, 'Aggressive level 2'),
(6, 216, 'false');

-- For observation 217
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 217, 'Female'),
(2, 217, '1'),
(3, 217, 'good'),
(4, 217, 'teenage'),
(5, 217, 'Aggressive level 3'),
(6, 217, 'true');

-- For observation 218
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 218, 'Male'),
(2, 218, '2'),
(3, 218, 'good'),
(4, 218, 'child'),
(5, 218, 'Physical contact'),
(6, 218, 'false');

-- For observation 219
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 219, 'Female'),
(2, 219, '3'),
(3, 219, 'good'),
(4, 219, 'adult'),
(5, 219, 'Aggressive level 1'),
(6, 219, 'true');

-- For observation 220
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 220, 'Male'),
(2, 220, '1'),
(3, 220, 'good'),
(4, 220, 'teenage'),
(5, 220, 'Aggressive level 2'),
(6, 220, 'false');
