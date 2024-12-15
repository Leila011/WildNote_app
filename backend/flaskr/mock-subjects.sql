-- Insert mock data into experiment table
INSERT INTO experiment (experiment_id, status, timestamp_start, timestamp_end, predefine_subject, name, duration, samples_number_goal, samples_time_goal, obs_number_goal, obs_time_goal) VALUES
(2, 'active', '2023-01-01 08:00:00', '2023-01-01 13:30:00', 1, 'Experiment with predefined subjects', 600, 10, 600, 20, 1200);

-- Insert mock data into subject table
INSERT INTO subject (timestamp_creation, name, experiment_id) VALUES
('2023-01-01 08:00:00', 'Subject 1', 2),
('2023-01-01 08:10:00', 'Subject 2', 2),
('2023-01-01 08:20:00', 'Subject 3', 2),
('2023-01-01 08:30:00', 'Subject 4', 2),
('2023-01-01 08:40:00', 'Subject 5', 2);

-- Insert mock data into sample table
INSERT INTO sample (experiment_id, subject_id, status, timestamp_start, timestamp_end) VALUES
( 2, 1, 'active', '2023-01-01 08:00:00', '2023-01-01 09:00:00'),
( 2, 2, 'completed', '2023-01-01 09:00:00', '2023-01-01 10:00:00'),
( 2, 3, 'active', '2023-01-01 10:00:00', '2023-01-01 11:00:00'),
( 2, 4, 'completed', '2023-01-01 11:00:00', '2023-01-01 12:00:00'),
( 2, 5, 'active', '2023-01-01 12:00:00', '2023-01-01 13:00:00');

-- Insert mock data into observation table
INSERT INTO observation (sample_id, status, timestamp_start, timestamp_end) VALUES
(114, 'completed', '2023-01-01 08:30:00', '2023-01-01 09:00:00'),
(114, 'completed', '2023-01-01 09:00:00', '2023-01-01 09:30:00'),
(115, 'completed', '2023-01-01 09:30:00', '2023-01-01 10:00:00'),
(115, 'completed', '2023-01-01 10:00:00', '2023-01-01 10:30:00'),
(116, 'completed', '2023-01-01 10:30:00', '2023-01-01 11:00:00'),
(116, 'completed', '2023-01-01 11:00:00', '2023-01-01 11:30:00'),
(117, 'completed', '2023-01-01 11:30:00', '2023-01-01 12:00:00'),
(117, 'completed', '2023-01-01 12:00:00', '2023-01-01 12:30:00'),
(118, 'completed', '2023-01-01 12:30:00', '2023-01-01 13:00:00'),
(118, 'completed', '2023-01-01 13:00:00', '2023-01-01 13:30:00');

-- Insert mock data into experiment_attributes table
INSERT INTO experiment_attributes (experiment_attributes_id, name, label, type, custom, autofill, required, min, max, choices, default_value, experiment_id) VALUES
(2, 'description', 'Description', 'string', 1, 1, 1, NULL, NULL, NULL, NULL, 2);

-- Insert mock data into sample_attributes table
INSERT INTO sample_attributes (name, label, type, custom, autofill, required, min, max, choices, default_value, experiment_id) VALUES
('location', 'Location', 'string', 1, 0, 0, NULL, NULL, 'loc1|loc2|loc3', NULL, 2),
('group', 'Group', 'string', 1, 0, 0, NULL, NULL, 'group1|group2', NULL, 2);

-- Insert mock data into observation_attributes table
INSERT INTO observation_attributes (name, label, type, custom, autofill, required, min, max, choices, default_value, experiment_id) VALUES
('behavior', 'Behavior', 'string', 1, 0, 0, NULL, NULL, 'sleep|eat|play|rest', NULL, 2);

-- Insert mock data into subject_attributes table
INSERT INTO subject_attributes (name, label, type, custom, autofill, required, min, max, choices, default_value, experiment_id) VALUES
('gender', 'Gender', 'string', 1, 0, 0, NULL, NULL, 'male|female', NULL, 2),
('age', 'Age', 'string', 1, 0, 0, NULL, NULL, 'child|teenager|adult', NULL, 2);

-- Insert mock data into experiment_attribute_values table
INSERT INTO experiment_attribute_values (attribute_id, experiment_id, value) VALUES
(2, 2, 'Experiment 2');

-- Insert mock data into sample_attribute_values table
INSERT INTO sample_attribute_values (attribute_id, sample_id, value) VALUES
( 7, 114, 'loc1'),
( 8, 114, 'group1'),
( 7, 115, 'loc2'),
( 8, 115, 'group2'),
( 7, 116, 'loc3'),
( 8, 116, 'group1'),
( 7, 117, 'loc1'),
(8, 117, 'group2'),
( 7, 118, 'loc2'),
( 8, 118, 'group1');

-- Insert mock data into observation_attribute_values table
INSERT INTO observation_attribute_values (attribute_id, observation_id, value) VALUES
( 7, 1, 'sleep'),
( 7, 2, 'eat'),
( 7, 3, 'play'),
( 7, 4, 'rest'),
( 7, 5, 'sleep'),
( 7, 6, 'eat'),
( 7, 7, 'play'),
( 7, 8, 'rest'),
( 7, 9, 'sleep'),
( 7, 10, 'eat');

-- Insert mock data into subject_attribute_values table
INSERT INTO subject_attribute_values ( attribute_id, subject_id, value) VALUES
( 1, 1, 'male'),
( 2, 1, 'adult'),
( 1, 2, 'female'),
( 2, 2, 'child'),
( 1, 3, 'male'),
( 2, 3, 'teenager'),
( 1, 4, 'female'),
( 2, 4, 'adult'),
( 1, 5, 'male'),
( 2, 5, 'child');