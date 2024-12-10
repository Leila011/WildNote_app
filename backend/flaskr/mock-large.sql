-- Insert mock data into experiment table
INSERT INTO experiment (status, timestamp_start, timestamp_end,  predefine_subject, name)
VALUES 
('active', '2024-12-01 08:00:00', '2024-12-01 18:00:00', 0, 'Monkey Forest Study');

INSERT INTO experiment_attributes (experiment_id, name, label, type, custom, autofill, required, min, max, choices, default_value) VALUES
(1, 'description', 'Decription', 'string', 1, 1, 1, null, null, null, null);

INSERT INTO experiment_attribute_values (attribute_id, experiment_id, value) VALUES
(1, 1, 'Mock data of a study of money-human interactions in a monkey forest setting');

-- Insert mock sample attributes (e.g., localisation, weather, group size, etc.)
INSERT INTO sample_attributes (experiment_id, name, label, type, custom, autofill, required, min, max, choices, default_value) VALUES
(1, 'localisation', 'Localisation', 'integer', 0, 1, 0, null, null, '1|2|3', '1'),
(1, 'weather', 'Weather', 'string', 0, 1, 0, null, null, 'sun|rain|cloud', 'sun'),
(1, 'group_size', 'Group Size', 'integer', 0, 1, 0, 1, null, null, null),
(1, 'num_adult_men', 'Number of Adult Men', 'integer', 0, 1, 0, 0, null, null, null),
(1, 'num_adult_women', 'Number of Adult Women', 'integer', 0, 1, 0, 0, null, null, null),
(1, 'num_kids', 'Number of Kids', 'integer', 0, 1, 0, 0, null, null, null);

-- Insert observation attributes (interaction and visible food behavior)
INSERT INTO observation_attributes (experiment_id, name, label, type, custom, autofill, required, min, max, choices, default_value) VALUES
(1, 'monkey_gender', 'Monkey gender', 'string', 0, 0, 1, null, null, 'Male|Female', null),
(1, 'monkey_group', 'Monkey group', 'string', 0, 0, 1, null, null, '1|2|3', null),
(1, 'monkey_health', 'Monkey health', 'string', 0, 0, 1, null, null, 'good|injured|sick', 'good'),
(1, 'monkey_age', 'Monkey age', 'string', 0, 0, 1, null, null, 'adult|teenage|child', 'adult'),
(1, 'interaction', 'Interaction', 'string', 0, 0, 1, null, null, 'Aggressive level 1|Aggressive level 2|Aggressive level 3|Physical contact', null),
(1, 'visible_food', 'Visible Food', 'boolean', 0, 0, 0, null, null, null, 0);

-- Insert 100 mock data rows with 10-minute duration, multiple samples per day (7-15 samples per day)
INSERT INTO sample (experiment_id, subject_id, status, timestamp_start, timestamp_end) VALUES
(1, NULL, 'completed', '2024-01-01 08:00:00', '2024-01-01 08:10:00'),
(1, NULL, 'completed', '2024-01-01 08:15:00', '2024-01-01 08:25:00'),
(1, NULL, 'completed', '2024-01-01 08:30:00', '2024-01-01 08:40:00'),
(1, NULL, 'completed', '2024-01-01 08:45:00', '2024-01-01 08:55:00'),
(1, NULL, 'completed', '2024-01-01 09:00:00', '2024-01-01 09:10:00'),
(1, NULL, 'completed', '2024-01-01 09:15:00', '2024-01-01 09:25:00'),
(1, NULL, 'completed', '2024-01-01 09:30:00', '2024-01-01 09:40:00'),
(1, NULL, 'completed', '2024-01-01 09:45:00', '2024-01-01 09:55:00'),
(1, NULL, 'completed', '2024-01-01 10:00:00', '2024-01-01 10:10:00'),
(1, NULL, 'completed', '2024-01-01 10:15:00', '2024-01-01 10:25:00'),

(1, NULL, 'completed', '2024-01-01 10:30:00', '2024-01-01 10:40:00'),
(1, NULL, 'completed', '2024-01-01 10:45:00', '2024-01-01 10:55:00'),
(1, NULL, 'completed', '2024-01-01 11:00:00', '2024-01-01 11:10:00'),
(1, NULL, 'completed', '2024-01-01 11:15:00', '2024-01-01 11:25:00'),
(1, NULL, 'completed', '2024-01-02 08:00:00', '2024-01-02 08:10:00'),
(1, NULL, 'completed', '2024-01-02 08:15:00', '2024-01-02 08:25:00'),
(1, NULL, 'completed', '2024-01-02 08:30:00', '2024-01-02 08:40:00'),
(1, NULL, 'completed', '2024-01-02 08:45:00', '2024-01-02 08:55:00'),
(1, NULL, 'completed', '2024-01-02 09:00:00', '2024-01-02 09:10:00'),
(1, NULL, 'completed', '2024-01-02 09:15:00', '2024-01-02 09:25:00'),
(1, NULL, 'completed', '2024-01-02 09:30:00', '2024-01-02 09:40:00'),

(1, NULL, 'completed', '2024-01-02 09:45:00', '2024-01-02 09:55:00'),
(1, NULL, 'completed', '2024-01-02 10:00:00', '2024-01-02 10:10:00'),
(1, NULL, 'completed', '2024-01-02 10:15:00', '2024-01-02 10:25:00'),
(1, NULL, 'completed', '2024-01-02 10:30:00', '2024-01-02 10:40:00'),
(1, NULL, 'completed', '2024-01-02 10:45:00', '2024-01-02 10:55:00'),
(1, NULL, 'completed', '2024-01-03 09:00:00', '2024-01-03 09:10:00'),
(1, NULL, 'completed', '2024-01-03 09:15:00', '2024-01-03 09:25:00'),
(1, NULL, 'completed', '2024-01-03 09:30:00', '2024-01-03 09:40:00'),
(1, NULL, 'completed', '2024-01-03 09:45:00', '2024-01-03 09:55:00'),
(1, NULL, 'completed', '2024-01-03 10:00:00', '2024-01-03 10:10:00'),
(1, NULL, 'completed', '2024-01-03 10:15:00', '2024-01-03 10:25:00'),

(1, NULL, 'completed', '2024-01-03 10:30:00', '2024-01-03 10:40:00'),
(1, NULL, 'completed', '2024-01-03 10:45:00', '2024-01-03 10:55:00'),
(1, NULL, 'completed', '2024-01-03 11:00:00', '2024-01-03 11:10:00'),
(1, NULL, 'completed', '2024-01-04 10:00:00', '2024-01-04 10:10:00'),
(1, NULL, 'completed', '2024-01-04 10:15:00', '2024-01-04 10:25:00'),
(1, NULL, 'completed', '2024-01-04 10:30:00', '2024-01-04 10:40:00'),
(1, NULL, 'completed', '2024-01-04 10:45:00', '2024-01-04 10:55:00'),
(1, NULL, 'completed', '2024-01-04 11:00:00', '2024-01-04 11:10:00'),
(1, NULL, 'completed', '2024-01-04 11:15:00', '2024-01-04 11:25:00'),
(1, NULL, 'completed', '2024-01-04 11:30:00', '2024-01-04 11:40:00'),
(1, NULL, 'completed', '2024-01-04 11:45:00', '2024-01-04 11:55:00'),

(1, NULL, 'completed', '2024-01-04 12:00:00', '2024-01-04 12:10:00'),
(1, NULL, 'completed', '2024-01-05 07:30:00', '2024-01-05 07:40:00'),
(1, NULL, 'completed', '2024-01-05 07:45:00', '2024-01-05 07:55:00'),
(1, NULL, 'completed', '2024-01-05 08:00:00', '2024-01-05 08:10:00'),
(1, NULL, 'completed', '2024-01-05 08:15:00', '2024-01-05 08:25:00'),
(1, NULL, 'completed', '2024-01-05 08:30:00', '2024-01-05 08:40:00'),
(1, NULL, 'completed', '2024-01-05 08:45:00', '2024-01-05 08:55:00'),
(1, NULL, 'completed', '2024-01-05 09:00:00', '2024-01-05 09:10:00'),
(1, NULL, 'completed', '2024-01-06 10:00:00', '2024-01-06 10:10:00'),
(1, NULL, 'completed', '2024-01-06 10:15:00', '2024-01-06 10:25:00'),
(1, NULL, 'completed', '2024-01-06 10:30:00', '2024-01-06 10:40:00'),
    
(1, NULL, 'completed', '2024-01-06 10:45:00', '2024-01-06 10:55:00'),
(1, NULL, 'completed', '2024-01-06 11:00:00', '2024-01-06 11:10:00'),
(1, NULL, 'completed', '2024-01-06 11:15:00', '2024-01-06 11:25:00'),
(1, NULL, 'completed', '2024-01-06 11:30:00', '2024-01-06 11:40:00'),
(1, NULL, 'completed', '2024-01-06 11:45:00', '2024-01-06 11:55:00'),
(1, NULL, 'completed', '2024-01-07 08:00:00', '2024-01-07 08:10:00'),
(1, NULL, 'completed', '2024-01-07 08:15:00', '2024-01-07 08:25:00'),
(1, NULL, 'completed', '2024-01-07 08:30:00', '2024-01-07 08:40:00'),
(1, NULL, 'completed', '2024-01-07 08:45:00', '2024-01-07 08:55:00'),
(1, NULL, 'completed', '2024-01-07 09:00:00', '2024-01-07 09:10:00'),
(1, NULL, 'completed', '2024-01-07 09:15:00', '2024-01-07 09:25:00'),
    
(1, NULL, 'completed', '2024-01-07 09:30:00', '2024-01-07 09:40:00'),
(1, NULL, 'completed', '2024-01-07 09:45:00', '2024-01-07 09:55:00'),
(1, NULL, 'completed', '2024-01-07 10:00:00', '2024-01-07 10:10:00'),
(1, NULL, 'completed', '2024-01-07 10:15:00', '2024-01-07 10:25:00'),
(1, NULL, 'completed', '2024-01-07 10:30:00', '2024-01-07 10:40:00'),
(1, NULL, 'completed', '2024-01-07 10:45:00', '2024-01-07 10:55:00'),
(1, NULL, 'completed', '2024-01-08 08:00:00', '2024-01-08 08:10:00'),
(1, NULL, 'completed', '2024-01-08 08:15:00', '2024-01-08 08:25:00'),
(1, NULL, 'completed', '2024-01-08 08:30:00', '2024-01-08 08:40:00'),
(1, NULL, 'completed', '2024-01-08 08:45:00', '2024-01-08 08:55:00'),
(1, NULL, 'completed', '2024-01-08 09:00:00', '2024-01-08 09:10:00'),
(1, NULL, 'completed', '2024-01-08 09:15:00', '2024-01-08 09:25:00'),
    
(1, NULL, 'completed', '2024-01-08 09:30:00', '2024-01-08 09:40:00'),
(1, NULL, 'completed', '2024-01-08 09:45:00', '2024-01-08 09:55:00'),
(1, NULL, 'completed', '2024-01-08 10:00:00', '2024-01-08 10:10:00'),
(1, NULL, 'completed', '2024-01-08 10:15:00', '2024-01-08 10:25:00'),
(1, NULL, 'completed', '2024-01-08 10:30:00', '2024-01-08 10:40:00'),
(1, NULL, 'completed', '2024-01-08 10:45:00', '2024-01-08 10:55:00'),
(1, NULL, 'completed', '2024-01-09 08:00:00', '2024-01-09 08:10:00'),
(1, NULL, 'completed', '2024-01-09 08:15:00', '2024-01-09 08:25:00'),
(1, NULL, 'completed', '2024-01-09 08:30:00', '2024-01-09 08:40:00'),
(1, NULL, 'completed', '2024-01-09 08:45:00', '2024-01-09 08:55:00'),
(1, NULL, 'completed', '2024-01-09 09:00:00', '2024-01-09 09:10:00'),
(1, NULL, 'completed', '2024-01-09 09:15:00', '2024-01-09 09:25:00'),
    
(1, NULL, 'completed', '2024-01-09 09:30:00', '2024-01-09 09:40:00'),
(1, NULL, 'completed', '2024-01-09 09:45:00', '2024-01-09 09:55:00'),
(1, NULL, 'completed', '2024-01-09 10:00:00', '2024-01-09 10:10:00'),
(1, NULL, 'completed', '2024-01-09 10:15:00', '2024-01-09 10:25:00'),
(1, NULL, 'completed', '2024-01-09 10:30:00', '2024-01-09 10:40:00'),
(1, NULL, 'completed', '2024-01-09 10:45:00', '2024-01-09 10:55:00'),
(1, NULL, 'completed', '2024-01-10 08:00:00', '2024-01-10 08:10:00'),
(1, NULL, 'completed', '2024-01-10 08:15:00', '2024-01-10 08:25:00'),
(1, NULL, 'completed', '2024-01-10 08:30:00', '2024-01-10 08:40:00'),
(1, NULL, 'completed', '2024-01-10 08:45:00', '2024-01-10 08:55:00'),
(1, NULL, 'completed', '2024-01-10 09:00:00', '2024-01-10 09:10:00'),
(1, NULL, 'completed', '2024-01-10 09:15:00', '2024-01-10 09:25:00'),
    
(1, NULL, 'completed', '2024-01-10 09:30:00', '2024-01-10 09:40:00'),
(1, NULL, 'completed', '2024-01-10 09:45:00', '2024-01-10 09:55:00'),
(1, NULL, 'completed', '2024-01-10 10:00:00', '2024-01-10 10:10:00'),
(1, NULL, 'completed', '2024-01-10 10:15:00', '2024-01-10 10:25:00'),
(1, NULL, 'completed', '2024-01-10 10:30:00', '2024-01-10 10:40:00'),
(1, NULL, 'completed', '2024-01-10 10:45:00', '2024-01-10 10:55:00'),
(1, NULL, 'completed', '2024-01-11 08:00:00', '2024-01-11 08:10:00'),
(1, NULL, 'completed', '2024-01-11 08:15:00', '2024-01-11 08:25:00'),
(1, NULL, 'completed', '2024-01-11 08:30:00', '2024-01-11 08:40:00'),
(1, NULL, 'completed', '2024-01-11 08:45:00', '2024-01-11 08:55:00'),
(1, NULL, 'completed', '2024-01-11 09:00:00', '2024-01-11 09:10:00'),
(1, NULL, 'completed', '2024-01-11 09:15:00', '2024-01-11 09:25:00');
    

-- Mock data for sample_attribute_values with 100 samples, all attributes inserted at once

-- Sample 1
INSERT INTO sample_attribute_values (attribute_id, sample_id, value) VALUES
(1, 1, '1'),   -- localisation
(2, 1, 'sun'),  -- weather
(3, 1, '4'),    -- group_size
(4, 1, '1'),    -- num_adult_men
(5, 1, '2'),    -- num_adult_women
(6, 1, '1');    -- num_kids

-- Sample 2
INSERT INTO sample_attribute_values (attribute_id, sample_id, value) VALUES
(1, 2, '2'),   -- localisation
(2, 2, 'cloud'),  -- weather
(3, 2, '4'),    -- group_size
(4, 2, '2'),    -- num_adult_men
(5, 2, '1'),    -- num_adult_women
(6, 2, '2');    -- num_kids

-- Sample 3
INSERT INTO sample_attribute_values (attribute_id, sample_id, value) VALUES
(1, 3, '3'),   -- localisation
(2, 3, 'rain'),  -- weather
(3, 3, '3'),    -- group_size
(4, 3, '0'),    -- num_adult_men
(5, 3, '3'),    -- num_adult_women
(6, 3, '0');    -- num_kids

-- Sample 4
INSERT INTO sample_attribute_values (attribute_id, sample_id, value) VALUES
(1, 4, '1'),   -- localisation
(2, 4, 'sun'),  -- weather
(3, 4, '4'),    -- group_size
(4, 4, '1'),    -- num_adult_men
(5, 4, '0'),    -- num_adult_women
(6, 4, '3');    -- num_kids

-- Sample 5
INSERT INTO sample_attribute_values (attribute_id, sample_id, value) VALUES
(1, 5, '2'),   -- localisation
(2, 5, 'rain'),  -- weather
(3, 5, '6'),    -- group_size
(4, 5, '3'),    -- num_adult_men
(5, 5, '2'),    -- num_adult_women
(6, 5, '1');    -- num_kids

-- Sample 6
INSERT INTO sample_attribute_values (attribute_id, sample_id, value) VALUES
(1, 6, '3'),   -- localisation
(2, 6, 'cloud'),  -- weather
(3, 6, '3'),   -- group_size
(4, 6, '2'),    -- num_adult_men
(5, 6, '1'),    -- num_adult_women
(6, 6, '0');    -- num_kids

-- Sample 7
INSERT INTO sample_attribute_values (attribute_id, sample_id, value) VALUES
(1, 7, '1'),   -- localisation
(2, 7, 'sun'),  -- weather
(3, 7, '8'),    -- group_size
(4, 7, '0'),    -- num_adult_men
(5, 7, '4'),    -- num_adult_women
(6, 7, '4');    -- num_kids

-- Sample 8
INSERT INTO sample_attribute_values (attribute_id, sample_id, value) VALUES
(1, 8, '2'),   -- localisation
(2, 8, 'cloud'),  -- weather
(3, 8, '4'),    -- group_size
(4, 8, '1'),    -- num_adult_men
(5, 8, '1'),    -- num_adult_women
(6, 8, '2');    -- num_kids

-- Sample 9
INSERT INTO sample_attribute_values (attribute_id, sample_id, value) VALUES
(1, 9, '3'),   -- localisation
(2, 9, 'rain'),  -- weather
(3, 9, '4'),    -- group_size
(4, 9, '4'),    -- num_adult_men
(5, 9, '0'),    -- num_adult_women
(6, 9, '0');    -- num_kids

-- Sample 10
INSERT INTO sample_attribute_values (attribute_id, sample_id, value) VALUES
(1, 10, '1'),   -- localisation
(2, 10, 'sun'),  -- weather
(3, 10, '5'),    -- group_size
(4, 10, '1'),    -- num_adult_men
(5, 10, '3'),    -- num_adult_women
(6, 10, '1');    -- num_kids

-- Sample 11
INSERT INTO sample_attribute_values (attribute_id, sample_id, value) VALUES
(1, 11, '2'),   -- localisation
(2, 11, 'cloud'),  -- weather
(3, 11, '4'),    -- group_size
(4, 11, '2'),    -- num_adult_men
(5, 11, '2'),    -- num_adult_women
(6, 11, '1');    -- num_kids

-- Sample 12
INSERT INTO sample_attribute_values (attribute_id, sample_id, value) VALUES
(1, 12, '1'),   -- localisation
(2, 12, 'sun'),  -- weather
(3, 12, '6'),    -- group_size
(4, 12, '1'),    -- num_adult_men
(5, 12, '3'),    -- num_adult_women
(6, 12, '2');    -- num_kids

-- Sample 13
INSERT INTO sample_attribute_values (attribute_id, sample_id, value) VALUES
(1, 13, '3'),   -- localisation
(2, 13, 'rain'),  -- weather
(3, 13, '4'),    -- group_size
(4, 13, '3'),    -- num_adult_men
(5, 13, '1'),    -- num_adult_women
(6, 13, '0');    -- num_kids

-- Sample 14
INSERT INTO sample_attribute_values (attribute_id, sample_id, value) VALUES
(1, 14, '2'),   -- localisation
(2, 14, 'cloud'),  -- weather
(3, 14, '7'),    -- group_size
(4, 14, '0'),    -- num_adult_men
(5, 14, '4'),    -- num_adult_women
(6, 14, '3');    -- num_kids

-- Sample 15
INSERT INTO sample_attribute_values (attribute_id, sample_id, value) VALUES
(1, 15, '1'),   -- localisation
(2, 15, 'sun'),  -- weather
(3, 15, '5'),    -- group_size
(4, 15, '2'),    -- num_adult_men
(5, 15, '1'),    -- num_adult_women
(6, 15, '2');    -- num_kids

-- Sample 16
INSERT INTO sample_attribute_values (attribute_id, sample_id, value) VALUES
(1, 16, '3'),   -- localisation
(2, 16, 'rain'),  -- weather
(3, 16, '4'),   -- group_size
(4, 16, '1'),    -- num_adult_men
(5, 16, '2'),    -- num_adult_women
(6, 16, '1');    -- num_kids

-- Sample 17
INSERT INTO sample_attribute_values (attribute_id, sample_id, value) VALUES
(1, 17, '2'),   -- localisation
(2, 17, 'cloud'),  -- weather
(3, 17, '6'),    -- group_size
(4, 17, '3'),    -- num_adult_men
(5, 17, '1'),    -- num_adult_women
(6, 17, '2');    -- num_kids

-- Sample 18
INSERT INTO sample_attribute_values (attribute_id, sample_id, value) VALUES
(1, 18, '1'),   -- localisation
(2, 18, 'sun'),  -- weather
(3, 18, '4'),    -- group_size
(4, 18, '0'),    -- num_adult_men
(5, 18, '3'),    -- num_adult_women
(6, 18, '1');    -- num_kids

-- Sample 19
INSERT INTO sample_attribute_values (attribute_id, sample_id, value) VALUES
(1, 19, '3'),   -- localisation
(2, 19, 'rain'),  -- weather
(3, 19, '4'),    -- group_size
(4, 19, '4'),    -- num_adult_men
(5, 19, '0'),    -- num_adult_women
(6, 19, '0');    -- num_kids

-- Sample 20
INSERT INTO sample_attribute_values (attribute_id, sample_id, value) VALUES
(1, 20, '2'),   -- localisation
(2, 20, 'cloud'),  -- weather
(3, 20, '7'),    -- group_size
(4, 20, '2'),    -- num_adult_men
(5, 20, '2'),    -- num_adult_women
(6, 20, '3');    -- num_kids

-- Sample 21
INSERT INTO sample_attribute_values (attribute_id, sample_id, value) VALUES
(1, 21, '2'),   -- localisation
(2, 21, 'sun'),  -- weather
(3, 21, '4'),    -- group_size
(4, 21, '1'),    -- num_adult_men
(5, 21, '2'),    -- num_adult_women
(6, 21, '1');    -- num_kids

-- Sample 22
INSERT INTO sample_attribute_values (attribute_id, sample_id, value) VALUES
(1, 22, '1'),   -- localisation
(2, 22, 'rain'),  -- weather
(3, 22, '7'),    -- group_size
(4, 22, '2'),    -- num_adult_men
(5, 22, '2'),    -- num_adult_women
(6, 22, '3');    -- num_kids

-- Sample 23
INSERT INTO sample_attribute_values (attribute_id, sample_id, value) VALUES
(1, 23, '3'),   -- localisation
(2, 23, 'cloud'),  -- weather
(3, 23, '6'),    -- group_size
(4, 23, '3'),    -- num_adult_men
(5, 23, '1'),    -- num_adult_women
(6, 23, '2');    -- num_kids

-- Sample 24
INSERT INTO sample_attribute_values (attribute_id, sample_id, value) VALUES
(1, 24, '2'),   -- localisation
(2, 24, 'sun'),  -- weather
(3, 24, '6'),    -- group_size
(4, 24, '0'),    -- num_adult_men
(5, 24, '4'),    -- num_adult_women
(6, 24, '2');    -- num_kids

-- Sample 25
INSERT INTO sample_attribute_values (attribute_id, sample_id, value) VALUES
(1, 25, '1'),   -- localisation
(2, 25, 'rain'),  -- weather
(3, 25, '6'),    -- group_size
(4, 25, '2'),    -- num_adult_men
(5, 25, '1'),    -- num_adult_women
(6, 25, '3');    -- num_kids

-- Sample 26
INSERT INTO sample_attribute_values (attribute_id, sample_id, value) VALUES
(1, 26, '3'),   -- localisation
(2, 26, 'cloud'),  -- weather
(3, 26, '4'),    -- group_size
(4, 26, '3'),    -- num_adult_men
(5, 26, '0'),    -- num_adult_women
(6, 26, '1');    -- num_kids

-- Sample 27
INSERT INTO sample_attribute_values (attribute_id, sample_id, value) VALUES
(1, 27, '2'),   -- localisation
(2, 27, 'sun'),  -- weather
(3, 27, '6'),    -- group_size
(4, 27, '2'),    -- num_adult_men
(5, 27, '2'),    -- num_adult_women
(6, 27, '2');    -- num_kids

-- Sample 28
INSERT INTO sample_attribute_values (attribute_id, sample_id, value) VALUES
(1, 28, '1'),   -- localisation
(2, 28, 'rain'),  -- weather
(3, 28, '6'),    -- group_size
(4, 28, '1'),    -- num_adult_men
(5, 28, '3'),    -- num_adult_women
(6, 28, '2');    -- num_kids

-- Sample 29
INSERT INTO sample_attribute_values (attribute_id, sample_id, value) VALUES
(1, 29, '3'),   -- localisation
(2, 29, 'cloud'),  -- weather
(3, 29, '5'),    -- group_size
(4, 29, '0'),    -- num_adult_men
(5, 29, '2'),    -- num_adult_women
(6, 29, '3');    -- num_kids

-- Sample 30
INSERT INTO sample_attribute_values (attribute_id, sample_id, value) VALUES
(1, 30, '2'),   -- localisation
(2, 30, 'sun'),  -- weather
(3, 30, '5'),   -- group_size
(4, 30, '4'),    -- num_adult_men
(5, 30, '1'),    -- num_adult_women
(6, 30, '0');    -- num_kids

-- Sample 31
INSERT INTO sample_attribute_values (attribute_id, sample_id, value) VALUES
(1, 31, '1'),   -- localisation
(2, 31, 'rain'),  -- weather
(3, 31, '6'),    -- group_size
(4, 31, '1'),    -- num_adult_men
(5, 31, '3'),    -- num_adult_women
(6, 31, '2');    -- num_kids

-- Sample 32
INSERT INTO sample_attribute_values (attribute_id, sample_id, value) VALUES
(1, 32, '3'),   -- localisation
(2, 32, 'cloud'),  -- weather
(3, 32, '7'),    -- group_size
(4, 32, '0'),    -- num_adult_men
(5, 32, '4'),    -- num_adult_women
(6, 32, '3');    -- num_kids

-- Sample 33
INSERT INTO sample_attribute_values (attribute_id, sample_id, value) VALUES
(1, 33, '2'),   -- localisation
(2, 33, 'sun'),  -- weather
(3, 33, '5'),    -- group_size
(4, 33, '2'),    -- num_adult_men
(5, 33, '1'),    -- num_adult_women
(6, 33, '2');    -- num_kids

-- Sample 34
INSERT INTO sample_attribute_values (attribute_id, sample_id, value) VALUES
(1, 34, '1'),   -- localisation
(2, 34, 'rain'),  -- weather
(3, 34, '7'),    -- group_size
(4, 34, '3'),    -- num_adult_men
(5, 34, '1'),    -- num_adult_women
(6, 34, '3');    -- num_kids

-- Sample 35
INSERT INTO sample_attribute_values (attribute_id, sample_id, value) VALUES
(1, 35, '3'),   -- localisation
(2, 35, 'cloud'),  -- weather
(3, 35, '6'),    -- group_size
(4, 35, '2'),    -- num_adult_men
(5, 35, '3'),    -- num_adult_women
(6, 35, '1');    -- num_kids

-- Sample 36
INSERT INTO sample_attribute_values (attribute_id, sample_id, value) VALUES
(1, 36, '2'),   -- localisation
(2, 36, 'sun'),  -- weather
(3, 36, '5'),   -- group_size
(4, 36, '1'),    -- num_adult_men
(5, 36, '4'),    -- num_adult_women
(6, 36, '0');    -- num_kids

-- Sample 37
INSERT INTO sample_attribute_values (attribute_id, sample_id, value) VALUES
(1, 37, '1'),   -- localisation
(2, 37, 'rain'),  -- weather
(3, 37, '6'),    -- group_size
(4, 37, '0'),    -- num_adult_men
(5, 37, '2'),    -- num_adult_women
(6, 37, '4');    -- num_kids

-- Sample 38
INSERT INTO sample_attribute_values (attribute_id, sample_id, value) VALUES
(1, 38, '3'),   -- localisation
(2, 38, 'cloud'),  -- weather
(3, 38, '4'),    -- group_size
(4, 38, '3'),    -- num_adult_men
(5, 38, '1'),    -- num_adult_women
(6, 38, '0');    -- num_kids

-- Sample 39
INSERT INTO sample_attribute_values (attribute_id, sample_id, value) VALUES
(1, 39, '2'),   -- localisation
(2, 39, 'sun'),  -- weather
(3, 39, '6'),    -- group_size
(4, 39, '4'),    -- num_adult_men
(5, 39, '0'),    -- num_adult_women
(6, 39, '2');    -- num_kids

-- Sample 40
INSERT INTO sample_attribute_values (attribute_id, sample_id, value) VALUES
(1, 40, '1'),   -- localisation
(2, 40, 'rain'),  -- weather
(3, 40, '5'),    -- group_size
(4, 40, '2'),    -- num_adult_men
(5, 40, '3'),    -- num_adult_women
(6, 40, '0');    -- num_kids

-- Sample 41
INSERT INTO sample_attribute_values (attribute_id, sample_id, value) VALUES
(1, 41, '2'),   -- localisation
(2, 41, 'sun'),  -- weather
(3, 41, '4'),    -- group_size
(4, 41, '1'),    -- num_adult_men
(5, 41, '2'),    -- num_adult_women
(6, 41, '1');    -- num_kids

-- Sample 42
INSERT INTO sample_attribute_values (attribute_id, sample_id, value) VALUES
(1, 42, '1'),   -- localisation
(2, 42, 'rain'),  -- weather
(3, 42, '7'),    -- group_size
(4, 42, '3'),    -- num_adult_men
(5, 42, '2'),    -- num_adult_women
(6, 42, '2');    -- num_kids

-- Sample 43
INSERT INTO sample_attribute_values (attribute_id, sample_id, value) VALUES
(1, 43, '3'),   -- localisation
(2, 43, 'cloud'),  -- weather
(3, 43, '6'),    -- group_size
(4, 43, '2'),    -- num_adult_men
(5, 43, '2'),    -- num_adult_women
(6, 43, '2');    -- num_kids

-- Sample 44
INSERT INTO sample_attribute_values (attribute_id, sample_id, value) VALUES
(1, 44, '2'),   -- localisation
(2, 44, 'sun'),  -- weather
(3, 44, '8'),    -- group_size
(4, 44, '3'),    -- num_adult_men
(5, 44, '3'),    -- num_adult_women
(6, 44, '2');    -- num_kids

-- Sample 45
INSERT INTO sample_attribute_values (attribute_id, sample_id, value) VALUES
(1, 45, '1'),   -- localisation
(2, 45, 'rain'),  -- weather
(3, 45, '5'),    -- group_size
(4, 45, '2'),    -- num_adult_men
(5, 45, '2'),    -- num_adult_women
(6, 45, '1');    -- num_kids

-- Sample 46
INSERT INTO sample_attribute_values (attribute_id, sample_id, value) VALUES
(1, 46, '3'),   -- localisation
(2, 46, 'cloud'),  -- weather
(3, 46, '10'),   -- group_size
(4, 46, '4'),    -- num_adult_men
(5, 46, '3'),    -- num_adult_women
(6, 46, '3');    -- num_kids

-- Sample 47
INSERT INTO sample_attribute_values (attribute_id, sample_id, value) VALUES
(1, 47, '2'),   -- localisation
(2, 47, 'sun'),  -- weather
(3, 47, '6'),    -- group_size
(4, 47, '2'),    -- num_adult_men
(5, 47, '3'),    -- num_adult_women
(6, 47, '1');    -- num_kids

-- Sample 48
INSERT INTO sample_attribute_values (attribute_id, sample_id, value) VALUES
(1, 48, '1'),   -- localisation
(2, 48, 'rain'),  -- weather
(3, 48, '7'),    -- group_size
(4, 48, '3'),    -- num_adult_men
(5, 48, '3'),    -- num_adult_women
(6, 48, '1');    -- num_kids

-- Sample 49
INSERT INTO sample_attribute_values (attribute_id, sample_id, value) VALUES
(1, 49, '3'),   -- localisation
(2, 49, 'cloud'),  -- weather
(3, 49, '8'),    -- group_size
(4, 49, '3'),    -- num_adult_men
(5, 49, '3'),    -- num_adult_women
(6, 49, '2');    -- num_kids

-- Sample 50
INSERT INTO sample_attribute_values (attribute_id, sample_id, value) VALUES
(1, 50, '2'),   -- localisation
(2, 50, 'sun'),  -- weather
(3, 50, '5'),    -- group_size
(4, 50, '2'),    -- num_adult_men
(5, 50, '2'),    -- num_adult_women
(6, 50, '1');    -- num_kids

-- Sample 51
INSERT INTO sample_attribute_values (attribute_id, sample_id, value) VALUES
(1, 51, '1'),   -- localisation
(2, 51, 'rain'),  -- weather
(3, 51, '6'),    -- group_size
(4, 51, '2'),    -- num_adult_men
(5, 51, '2'),    -- num_adult_women
(6, 51, '2');    -- num_kids

-- Sample 52
INSERT INTO sample_attribute_values (attribute_id, sample_id, value) VALUES
(1, 52, '3'),   -- localisation
(2, 52, 'cloud'),  -- weather
(3, 52, '9'),    -- group_size
(4, 52, '4'),    -- num_adult_men
(5, 52, '3'),    -- num_adult_women
(6, 52, '2');    -- num_kids

-- Sample 53
INSERT INTO sample_attribute_values (attribute_id, sample_id, value) VALUES
(1, 53, '2'),   -- localisation
(2, 53, 'sun'),  -- weather
(3, 53, '7'),    -- group_size
(4, 53, '3'),    -- num_adult_men
(5, 53, '3'),    -- num_adult_women
(6, 53, '1');    -- num_kids

-- Sample 54
INSERT INTO sample_attribute_values (attribute_id, sample_id, value) VALUES
(1, 54, '1'),   -- localisation
(2, 54, 'rain'),  -- weather
(3, 54, '10'),   -- group_size
(4, 54, '5'),    -- num_adult_men
(5, 54, '3'),    -- num_adult_women
(6, 54, '2');    -- num_kids

-- Sample 55
INSERT INTO sample_attribute_values (attribute_id, sample_id, value) VALUES
(1, 55, '3'),   -- localisation
(2, 55, 'cloud'),  -- weather
(3, 55, '5'),    -- group_size
(4, 55, '2'),    -- num_adult_men
(5, 55, '2'),    -- num_adult_women
(6, 55, '1');    -- num_kids

-- Sample 56
INSERT INTO sample_attribute_values (attribute_id, sample_id, value) VALUES
(1, 56, '2'),   -- localisation
(2, 56, 'sun'),  -- weather
(3, 56, '6'),    -- group_size
(4, 56, '3'),    -- num_adult_men
(5, 56, '2'),    -- num_adult_women
(6, 56, '1');    -- num_kids

-- Sample 57
INSERT INTO sample_attribute_values (attribute_id, sample_id, value) VALUES
(1, 57, '1'),   -- localisation
(2, 57, 'rain'),  -- weather
(3, 57, '7'),    -- group_size
(4, 57, '3'),    -- num_adult_men
(5, 57, '3'),    -- num_adult_women
(6, 57, '1');    -- num_kids

-- Sample 58
INSERT INTO sample_attribute_values (attribute_id, sample_id, value) VALUES
(1, 58, '3'),   -- localisation
(2, 58, 'cloud'),  -- weather
(3, 58, '4'),    -- group_size
(4, 58, '1'),    -- num_adult_men
(5, 58, '2'),    -- num_adult_women
(6, 58, '1');    -- num_kids

-- Sample 59
INSERT INTO sample_attribute_values (attribute_id, sample_id, value) VALUES
(1, 59, '2'),   -- localisation
(2, 59, 'sun'),  -- weather
(3, 59, '6'),    -- group_size
(4, 59, '2'),    -- num_adult_men
(5, 59, '3'),    -- num_adult_women
(6, 59, '1');    -- num_kids

-- Sample 60
INSERT INTO sample_attribute_values (attribute_id, sample_id, value) VALUES
(1, 60, '1'),   -- localisation
(2, 60, 'rain'),  -- weather
(3, 60, '7'),    -- group_size
(4, 60, '3'),    -- num_adult_men
(5, 60, '3'),    -- num_adult_women
(6, 60, '1');    -- num_kids

-- Sample 61
INSERT INTO sample_attribute_values (attribute_id, sample_id, value) VALUES
(1, 61, '3'),   -- localisation
(2, 61, 'cloud'),  -- weather
(3, 61, '8'),    -- group_size
(4, 61, '3'),    -- num_adult_men
(5, 61, '3'),    -- num_adult_women
(6, 61, '2');    -- num_kids

-- Sample 62
INSERT INTO sample_attribute_values (attribute_id, sample_id, value) VALUES
(1, 62, '2'),   -- localisation
(2, 62, 'sun'),  -- weather
(3, 62, '6'),    -- group_size
(4, 62, '2'),    -- num_adult_men
(5, 62, '3'),    -- num_adult_women
(6, 62, '1');    -- num_kids

-- Sample 63
INSERT INTO sample_attribute_values (attribute_id, sample_id, value) VALUES
(1, 63, '1'),   -- localisation
(2, 63, 'rain'),  -- weather
(3, 63, '5'),    -- group_size
(4, 63, '2'),    -- num_adult_men
(5, 63, '2'),    -- num_adult_women
(6, 63, '1');    -- num_kids

-- Sample 64
INSERT INTO sample_attribute_values (attribute_id, sample_id, value) VALUES
(1, 64, '3'),   -- localisation
(2, 64, 'cloud'),  -- weather
(3, 64, '5'),    -- group_size
(4, 64, '2'),    -- num_adult_men
(5, 64, '2'),    -- num_adult_women
(6, 64, '1');    -- num_kids

-- Sample 65
INSERT INTO sample_attribute_values (attribute_id, sample_id, value) VALUES
(1, 65, '2'),   -- localisation
(2, 65, 'sun'),  -- weather
(3, 65, '9'),    -- group_size
(4, 65, '4'),    -- num_adult_men
(5, 65, '4'),    -- num_adult_women
(6, 65, '1');    -- num_kids

-- Sample 66
INSERT INTO sample_attribute_values (attribute_id, sample_id, value) VALUES
(1, 66, '1'),   -- localisation
(2, 66, 'rain'),  -- weather
(3, 66, '8'),    -- group_size
(4, 66, '3'),    -- num_adult_men
(5, 66, '3'),    -- num_adult_women
(6, 66, '2');    -- num_kids

-- Sample 67
INSERT INTO sample_attribute_values (attribute_id, sample_id, value) VALUES
(1, 67, '3'),   -- localisation
(2, 67, 'cloud'),  -- weather
(3, 67, '5'),    -- group_size
(4, 67, '2'),    -- num_adult_men
(5, 67, '2'),    -- num_adult_women
(6, 67, '1');    -- num_kids

-- Sample 68
INSERT INTO sample_attribute_values (attribute_id, sample_id, value) VALUES
(1, 68, '2'),   -- localisation
(2, 68, 'sun'),  -- weather
(3, 68, '6'),    -- group_size
(4, 68, '3'),    -- num_adult_men
(5, 68, '2'),    -- num_adult_women
(6, 68, '1');    -- num_kids

-- Sample 69
INSERT INTO sample_attribute_values (attribute_id, sample_id, value) VALUES
(1, 69, '1'),   -- localisation
(2, 69, 'rain'),  -- weather
(3, 69, '4'),    -- group_size
(4, 69, '1'),    -- num_adult_men
(5, 69, '2'),    -- num_adult_women
(6, 69, '1');    -- num_kids

-- Sample 70
INSERT INTO sample_attribute_values (attribute_id, sample_id, value) VALUES
(1, 70, '3'),   -- localisation
(2, 70, 'cloud'),  -- weather
(3, 70, '5'),    -- group_size
(4, 70, '2'),    -- num_adult_men
(5, 70, '2'),    -- num_adult_women
(6, 70, '1');    -- num_kids

-- Sample 71
INSERT INTO sample_attribute_values (attribute_id, sample_id, value) VALUES
(1, 71, '2'),   -- localisation
(2, 71, 'sun'),  -- weather
(3, 71, '6'),    -- group_size
(4, 71, '2'),    -- num_adult_men
(5, 71, '3'),    -- num_adult_women
(6, 71, '1');    -- num_kids

-- Sample 72
INSERT INTO sample_attribute_values (attribute_id, sample_id, value) VALUES
(1, 72, '1'),   -- localisation
(2, 72, 'rain'),  -- weather
(3, 72, '7'),    -- group_size
(4, 72, '3'),    -- num_adult_men
(5, 72, '3'),    -- num_adult_women
(6, 72, '1');    -- num_kids

-- Sample 73
INSERT INTO sample_attribute_values (attribute_id, sample_id, value) VALUES
(1, 73, '3'),   -- localisation
(2, 73, 'cloud'),  -- weather
(3, 73, '8'),    -- group_size
(4, 73, '4'),    -- num_adult_men
(5, 73, '3'),    -- num_adult_women
(6, 73, '1');    -- num_kids

-- Sample 74
INSERT INTO sample_attribute_values (attribute_id, sample_id, value) VALUES
(1, 74, '2'),   -- localisation
(2, 74, 'sun'),  -- weather
(3, 74, '10'),   -- group_size
(4, 74, '5'),    -- num_adult_men
(5, 74, '4'),    -- num_adult_women
(6, 74, '1');    -- num_kids

-- Sample 75
INSERT INTO sample_attribute_values (attribute_id, sample_id, value) VALUES
(1, 75, '1'),   -- localisation
(2, 75, 'rain'),  -- weather
(3, 75, '4'),    -- group_size
(4, 75, '1'),    -- num_adult_men
(5, 75, '2'),    -- num_adult_women
(6, 75, '1');    -- num_kids

-- Sample 76
INSERT INTO sample_attribute_values (attribute_id, sample_id, value) VALUES
(1, 76, '3'),   -- localisation
(2, 76, 'cloud'),  -- weather
(3, 76, '6'),    -- group_size
(4, 76, '2'),    -- num_adult_men
(5, 76, '3'),    -- num_adult_women
(6, 76, '1');    -- num_kids

-- Sample 77
INSERT INTO sample_attribute_values (attribute_id, sample_id, value) VALUES
(1, 77, '2'),   -- localisation
(2, 77, 'sun'),  -- weather
(3, 77, '5'),    -- group_size
(4, 77, '2'),    -- num_adult_men
(5, 77, '2'),    -- num_adult_women
(6, 77, '1');    -- num_kids

-- Sample 78
INSERT INTO sample_attribute_values (attribute_id, sample_id, value) VALUES
(1, 78, '1'),   -- localisation
(2, 78, 'rain'),  -- weather
(3, 78, '8'),    -- group_size
(4, 78, '4'),    -- num_adult_men
(5, 78, '3'),    -- num_adult_women
(6, 78, '1');    -- num_kids

-- Sample 79
INSERT INTO sample_attribute_values (attribute_id, sample_id, value) VALUES
(1, 79, '3'),   -- localisation
(2, 79, 'cloud'),  -- weather
(3, 79, '7'),    -- group_size
(4, 79, '3'),    -- num_adult_men
(5, 79, '3'),    -- num_adult_women
(6, 79, '1');    -- num_kids

-- Sample 80
INSERT INTO sample_attribute_values (attribute_id, sample_id, value) VALUES
(1, 80, '2'),   -- localisation
(2, 80, 'sun'),  -- weather
(3, 80, '6'),    -- group_size
(4, 80, '2'),    -- num_adult_men
(5, 80, '3'),    -- num_adult_women
(6, 80, '1');    -- num_kids

-- Sample 81
INSERT INTO sample_attribute_values (attribute_id, sample_id, value) VALUES
(1, 81, '1'),   -- localisation
(2, 81, 'rain'),  -- weather
(3, 81, '9'),    -- group_size
(4, 81, '4'),    -- num_adult_men
(5, 81, '4'),    -- num_adult_women
(6, 81, '1');    -- num_kids

-- Sample 82
INSERT INTO sample_attribute_values (attribute_id, sample_id, value) VALUES
(1, 82, '3'),   -- localisation
(2, 82, 'cloud'),  -- weather
(3, 82, '6'),    -- group_size
(4, 82, '2'),    -- num_adult_men
(5, 82, '3'),    -- num_adult_women
(6, 82, '1');    -- num_kids

-- Sample 83
INSERT INTO sample_attribute_values (attribute_id, sample_id, value) VALUES
(1, 83, '2'),   -- localisation
(2, 83, 'sun'),  -- weather
(3, 83, '5'),    -- group_size
(4, 83, '2'),    -- num_adult_men
(5, 83, '2'),    -- num_adult_women
(6, 83, '1');    -- num_kids

-- Sample 84
INSERT INTO sample_attribute_values (attribute_id, sample_id, value) VALUES
(1, 84, '1'),   -- localisation
(2, 84, 'rain'),  -- weather
(3, 84, '8'),    -- group_size
(4, 84, '4'),    -- num_adult_men
(5, 84, '3'),    -- num_adult_women
(6, 84, '1');    -- num_kids

-- Sample 85
INSERT INTO sample_attribute_values (attribute_id, sample_id, value) VALUES
(1, 85, '3'),   -- localisation
(2, 85, 'cloud'),  -- weather
(3, 85, '9'),    -- group_size
(4, 85, '4'),    -- num_adult_men
(5, 85, '4'),    -- num_adult_women
(6, 85, '1');    -- num_kids

-- Sample 86
INSERT INTO sample_attribute_values (attribute_id, sample_id, value) VALUES
(1, 86, '2'),   -- localisation
(2, 86, 'sun'),  -- weather
(3, 86, '7'),    -- group_size
(4, 86, '3'),    -- num_adult_men
(5, 86, '3'),    -- num_adult_women
(6, 86, '1');    -- num_kids

-- Sample 87
INSERT INTO sample_attribute_values (attribute_id, sample_id, value) VALUES
(1, 87, '1'),   -- localisation
(2, 87, 'rain'),  -- weather
(3, 87, '5'),    -- group_size
(4, 87, '2'),    -- num_adult_men
(5, 87, '2'),    -- num_adult_women
(6, 87, '1');    -- num_kids

-- Sample 88
INSERT INTO sample_attribute_values (attribute_id, sample_id, value) VALUES
(1, 88, '3'),   -- localisation
(2, 88, 'cloud'),  -- weather
(3, 88, '4'),    -- group_size
(4, 88, '1'),    -- num_adult_men
(5, 88, '2'),    -- num_adult_women
(6, 88, '1');    -- num_kids

-- Sample 89
INSERT INTO sample_attribute_values (attribute_id, sample_id, value) VALUES
(1, 89, '2'),   -- localisation
(2, 89, 'sun'),  -- weather
(3, 89, '6'),    -- group_size
(4, 89, '3'),    -- num_adult_men
(5, 89, '2'),    -- num_adult_women
(6, 89, '1');    -- num_kids

-- Sample 90
INSERT INTO sample_attribute_values (attribute_id, sample_id, value) VALUES
(1, 90, '1'),   -- localisation
(2, 90, 'rain'),  -- weather
(3, 90, '8'),    -- group_size
(4, 90, '4'),    -- num_adult_men
(5, 90, '3'),    -- num_adult_women
(6, 90, '1');    -- num_kids

-- Sample 91
INSERT INTO sample_attribute_values (attribute_id, sample_id, value) VALUES
(1, 91, '3'),   -- localisation
(2, 91, 'cloud'),  -- weather
(3, 91, '7'),    -- group_size
(4, 91, '3'),    -- num_adult_men
(5, 91, '3'),    -- num_adult_women
(6, 91, '1');    -- num_kids

-- Sample 92
INSERT INTO sample_attribute_values (attribute_id, sample_id, value) VALUES
(1, 92, '2'),   -- localisation
(2, 92, 'sun'),  -- weather
(3, 92, '6'),    -- group_size
(4, 92, '3'),    -- num_adult_men
(5, 92, '2'),    -- num_adult_women
(6, 92, '1');    -- num_kids

-- Sample 93
INSERT INTO sample_attribute_values (attribute_id, sample_id, value) VALUES
(1, 93, '1'),   -- localisation
(2, 93, 'rain'),  -- weather
(3, 93, '4'),    -- group_size
(4, 93, '1'),    -- num_adult_men
(5, 93, '2'),    -- num_adult_women
(6, 93, '1');    -- num_kids

-- Sample 94
INSERT INTO sample_attribute_values (attribute_id, sample_id, value) VALUES
(1, 94, '3'),   -- localisation
(2, 94, 'cloud'),  -- weather
(3, 94, '6'),    -- group_size
(4, 94, '3'),    -- num_adult_men
(5, 94, '2'),    -- num_adult_women
(6, 94, '1');    -- num_kids

-- Sample 95
INSERT INTO sample_attribute_values (attribute_id, sample_id, value) VALUES
(1, 95, '2'),   -- localisation
(2, 95, 'sun'),  -- weather
(3, 95, '7'),    -- group_size
(4, 95, '4'),    -- num_adult_men
(5, 95, '2'),    -- num_adult_women
(6, 95, '1');    -- num_kids

-- Sample 96
INSERT INTO sample_attribute_values (attribute_id, sample_id, value) VALUES
(1, 96, '1'),   -- localisation
(2, 96, 'rain'),  -- weather
(3, 96, '5'),    -- group_size
(4, 96, '2'),    -- num_adult_men
(5, 96, '2'),    -- num_adult_women
(6, 96, '1');    -- num_kids

-- Sample 97
INSERT INTO sample_attribute_values (attribute_id, sample_id, value) VALUES
(1, 97, '3'),   -- localisation
(2, 97, 'cloud'),  -- weather
(3, 97, '8'),    -- group_size
(4, 97, '4'),    -- num_adult_men
(5, 97, '3'),    -- num_adult_women
(6, 97, '1');    -- num_kids

-- Sample 98
INSERT INTO sample_attribute_values (attribute_id, sample_id, value) VALUES
(1, 98, '2'),   -- localisation
(2, 98, 'sun'),  -- weather
(3, 98, '6'),    -- group_size
(4, 98, '2'),    -- num_adult_men
(5, 98, '3'),    -- num_adult_women
(6, 98, '1');    -- num_kids

-- Sample 99
INSERT INTO sample_attribute_values (attribute_id, sample_id, value) VALUES
(1, 99, '1'),   -- localisation
(2, 99, 'rain'),  -- weather
(3, 99, '7'),    -- group_size
(4, 99, '3'),    -- num_adult_men
(5, 99, '3'),    -- num_adult_women
(6, 99, '1');    -- num_kids

-- Sample 100
INSERT INTO sample_attribute_values (attribute_id, sample_id, value) VALUES
(1, 100, '3'),   -- localisation
(2, 100, 'cloud'),  -- weather
(3, 100, '5'),    -- group_size
(4, 100, '2'),    -- num_adult_men
(5, 100, '2'),    -- num_adult_women
(6, 100, '1');    -- num_kids


-- For sample 1: 2024-01-01 08:00:00 to 2024-01-01 08:10:00
INSERT INTO observation (sample_id, status, timestamp_start, timestamp_end)
VALUES
(1, 'completed', '2024-01-01 08:00:00', '2024-01-01 08:03:00'),
(1, 'completed', '2024-01-01 08:03:00', '2024-01-01 08:06:00'),
(1, 'completed', '2024-01-01 08:06:00', '2024-01-01 08:10:00');

-- For sample 2: 2024-01-01 08:15:00 to 2024-01-01 08:25:00
INSERT INTO observation (sample_id, status, timestamp_start, timestamp_end)
VALUES
(2, 'completed', '2024-01-01 08:15:00', '2024-01-01 08:18:00'),
(2, 'completed', '2024-01-01 08:18:00', '2024-01-01 08:25:00');

-- For sample 3: 2024-01-01 08:30:00 to 2024-01-01 08:40:00
INSERT INTO observation (sample_id, status, timestamp_start, timestamp_end)
VALUES
(3, 'completed', '2024-01-01 08:30:00', '2024-01-01 08:33:00'),
(3, 'completed', '2024-01-01 08:33:00', '2024-01-01 08:36:00'),
(3, 'completed', '2024-01-01 08:36:00', '2024-01-01 08:40:00');

-- For sample 4: 2024-01-01 08:45:00 to 2024-01-01 08:55:00
INSERT INTO observation (sample_id, status, timestamp_start, timestamp_end)
VALUES
(4, 'completed', '2024-01-01 08:45:00', '2024-01-01 08:48:00'),
(4, 'completed', '2024-01-01 08:48:00', '2024-01-01 08:55:00');

-- For sample 5: 2024-01-01 09:00:00 to 2024-01-01 09:10:00
INSERT INTO observation (sample_id, status, timestamp_start, timestamp_end)
VALUES
(5, 'completed', '2024-01-01 09:00:00', '2024-01-01 09:03:00'),
(5, 'completed', '2024-01-01 09:03:00', '2024-01-01 09:07:00'),
(5, 'completed', '2024-01-01 09:07:00', '2024-01-01 09:10:00');

-- For sample 6: 2024-01-01 09:15:00 to 2024-01-01 09:25:00
INSERT INTO observation (sample_id, status, timestamp_start, timestamp_end)
VALUES
(6, 'completed', '2024-01-01 09:15:00', '2024-01-01 09:20:00'),
(6, 'completed', '2024-01-01 09:20:00', '2024-01-01 09:25:00');

-- For sample 7: 2024-01-01 09:30:00 to 2024-01-01 09:40:00
INSERT INTO observation (sample_id, status, timestamp_start, timestamp_end)
VALUES
(7, 'completed', '2024-01-01 09:30:00', '2024-01-01 09:35:00'),
(7, 'completed', '2024-01-01 09:35:00', '2024-01-01 09:40:00');

-- For sample 8: 2024-01-01 09:45:00 to 2024-01-01 09:55:00
INSERT INTO observation (sample_id, status, timestamp_start, timestamp_end)
VALUES
(8, 'completed', '2024-01-01 09:45:00', '2024-01-01 09:50:00'),
(8, 'completed', '2024-01-01 09:50:00', '2024-01-01 09:55:00');

-- For sample 9: 2024-01-01 10:00:00 to 2024-01-01 10:10:00
INSERT INTO observation (sample_id, status, timestamp_start, timestamp_end)
VALUES
(9, 'completed', '2024-01-01 10:00:00', '2024-01-01 10:03:00'),
(9, 'completed', '2024-01-01 10:03:00', '2024-01-01 10:06:00'),
(9, 'completed', '2024-01-01 10:06:00', '2024-01-01 10:10:00');

-- For sample 10: 2024-01-01 10:15:00 to 2024-01-01 10:25:00
INSERT INTO observation (sample_id, status, timestamp_start, timestamp_end)
VALUES
(10, 'completed', '2024-01-01 10:15:00', '2024-01-01 10:18:00'),
(10, 'completed', '2024-01-01 10:18:00', '2024-01-01 10:22:00'),
(10, 'completed', '2024-01-01 10:22:00', '2024-01-01 10:25:00');

-- For sample 11: 2024-01-01 10:30:00 to 2024-01-01 10:40:00
INSERT INTO observation (sample_id, status, timestamp_start, timestamp_end)
VALUES
(11, 'completed', '2024-01-01 10:30:00', '2024-01-01 10:33:00'),
(11, 'completed', '2024-01-01 10:33:00', '2024-01-01 10:37:00'),
(11, 'completed', '2024-01-01 10:37:00', '2024-01-01 10:40:00');

-- For sample 12: 2024-01-01 10:45:00 to 2024-01-01 10:55:00
INSERT INTO observation (sample_id, status, timestamp_start, timestamp_end)
VALUES
(12, 'completed', '2024-01-01 10:45:00', '2024-01-01 10:48:00'),
(12, 'completed', '2024-01-01 10:48:00', '2024-01-01 10:52:00'),
(12, 'completed', '2024-01-01 10:52:00', '2024-01-01 10:55:00');

-- For sample 13: 2024-01-01 11:00:00 to 2024-01-01 11:10:00
INSERT INTO observation (sample_id, status, timestamp_start, timestamp_end)
VALUES
(13, 'completed', '2024-01-01 11:00:00', '2024-01-01 11:05:00'),
(13, 'completed', '2024-01-01 11:05:00', '2024-01-01 11:10:00');

-- For sample 14: 2024-01-01 11:15:00 to 2024-01-01 11:25:00
INSERT INTO observation (sample_id, status, timestamp_start, timestamp_end)
VALUES
(14, 'completed', '2024-01-01 11:15:00', '2024-01-01 11:20:00'),
(14, 'completed', '2024-01-01 11:20:00', '2024-01-01 11:25:00');

-- For sample 15: 2024-01-02 08:00:00 to 2024-01-02 08:10:00
INSERT INTO observation (sample_id, status, timestamp_start, timestamp_end)
VALUES
(15, 'completed', '2024-01-02 08:00:00', '2024-01-02 08:03:00'),
(15, 'completed', '2024-01-02 08:03:00', '2024-01-02 08:07:00'),
(15, 'completed', '2024-01-02 08:07:00', '2024-01-02 08:10:00');

-- For sample 16: 2024-01-02 08:15:00 to 2024-01-02 08:25:00
INSERT INTO observation (sample_id, status, timestamp_start, timestamp_end)
VALUES
(16, 'completed', '2024-01-02 08:15:00', '2024-01-02 08:17:00'),
(16, 'completed', '2024-01-02 08:17:00', '2024-01-02 08:21:00'),
(16, 'completed', '2024-01-02 08:21:00', '2024-01-02 08:25:00');

-- For sample 17: 2024-01-02 08:30:00 to 2024-01-02 08:40:00
INSERT INTO observation (sample_id, status, timestamp_start, timestamp_end)
VALUES
(17, 'completed', '2024-01-02 08:30:00', '2024-01-02 08:33:00'),
(17, 'completed', '2024-01-02 08:33:00', '2024-01-02 08:37:00'),
(17, 'completed', '2024-01-02 08:37:00', '2024-01-02 08:40:00');

-- For sample 18: 2024-01-02 08:45:00 to 2024-01-02 08:55:00
INSERT INTO observation (sample_id, status, timestamp_start, timestamp_end)
VALUES
(18, 'completed', '2024-01-02 08:45:00', '2024-01-02 08:48:00'),
(18, 'completed', '2024-01-02 08:48:00', '2024-01-02 08:52:00'),
(18, 'completed', '2024-01-02 08:52:00', '2024-01-02 08:55:00');

-- For sample 19: 2024-01-02 09:00:00 to 2024-01-02 09:10:00
INSERT INTO observation (sample_id, status, timestamp_start, timestamp_end)
VALUES
(19, 'completed', '2024-01-02 09:00:00', '2024-01-02 09:04:00'),
(19, 'completed', '2024-01-02 09:04:00', '2024-01-02 09:07:00'),
(19, 'completed', '2024-01-02 09:07:00', '2024-01-02 09:10:00');

-- For sample 20: 2024-01-02 09:15:00 to 2024-01-02 09:25:00
INSERT INTO observation (sample_id, status, timestamp_start, timestamp_end)
VALUES
(20, 'completed', '2024-01-02 09:15:00', '2024-01-02 09:18:00'),
(20, 'completed', '2024-01-02 09:18:00', '2024-01-02 09:21:00'),
(20, 'completed', '2024-01-02 09:21:00', '2024-01-02 09:25:00');

-- For sample 21: 2024-01-02 09:30:00 to 2024-01-02 09:40:00
INSERT INTO observation (sample_id, status, timestamp_start, timestamp_end)
VALUES
(21, 'completed', '2024-01-02 09:30:00', '2024-01-02 09:33:00'),
(21, 'completed', '2024-01-02 09:33:00', '2024-01-02 09:37:00'),
(21, 'completed', '2024-01-02 09:37:00', '2024-01-02 09:40:00');

-- For sample 22: 2024-01-02 09:45:00 to 2024-01-02 09:55:00
INSERT INTO observation (sample_id, status, timestamp_start, timestamp_end)
VALUES
(22, 'completed', '2024-01-02 09:45:00', '2024-01-02 09:48:00'),
(22, 'completed', '2024-01-02 09:48:00', '2024-01-02 09:52:00'),
(22, 'completed', '2024-01-02 09:52:00', '2024-01-02 09:55:00');

-- For sample 23: 2024-01-02 10:00:00 to 2024-01-02 10:10:00
INSERT INTO observation (sample_id, status, timestamp_start, timestamp_end)
VALUES
(23, 'completed', '2024-01-02 10:00:00', '2024-01-02 10:03:00'),
(23, 'completed', '2024-01-02 10:03:00', '2024-01-02 10:07:00'),
(23, 'completed', '2024-01-02 10:07:00', '2024-01-02 10:10:00');

-- For sample 24: 2024-01-02 10:15:00 to 2024-01-02 10:25:00
INSERT INTO observation (sample_id, status, timestamp_start, timestamp_end)
VALUES
(24, 'completed', '2024-01-02 10:15:00', '2024-01-02 10:18:00'),
(24, 'completed', '2024-01-02 10:18:00', '2024-01-02 10:22:00'),
(24, 'completed', '2024-01-02 10:22:00', '2024-01-02 10:25:00');

-- For sample 25: 2024-01-02 10:30:00 to 2024-01-02 10:40:00
INSERT INTO observation (sample_id, status, timestamp_start, timestamp_end)
VALUES
(25, 'completed', '2024-01-02 10:30:00', '2024-01-02 10:32:00'),
(25, 'completed', '2024-01-02 10:32:00', '2024-01-02 10:36:00'),
(25, 'completed', '2024-01-02 10:36:00', '2024-01-02 10:40:00');

-- For sample 26: 2024-01-02 10:45:00 to 2024-01-02 10:55:00
INSERT INTO observation (sample_id, status, timestamp_start, timestamp_end)
VALUES
(26, 'completed', '2024-01-02 10:45:00', '2024-01-02 10:47:00'),
(26, 'completed', '2024-01-02 10:47:00', '2024-01-02 10:51:00'),
(26, 'completed', '2024-01-02 10:51:00', '2024-01-02 10:55:00');

-- For sample 27: 2024-01-03 09:00:00 to 2024-01-03 09:10:00
INSERT INTO observation (sample_id, status, timestamp_start, timestamp_end)
VALUES
(27, 'completed', '2024-01-03 09:00:00', '2024-01-03 09:04:00'),
(27, 'completed', '2024-01-03 09:04:00', '2024-01-03 09:07:00'),
(27, 'completed', '2024-01-03 09:07:00', '2024-01-03 09:10:00');

-- For sample 28: 2024-01-03 09:15:00 to 2024-01-03 09:25:00
INSERT INTO observation (sample_id, status, timestamp_start, timestamp_end)
VALUES
(28, 'completed', '2024-01-03 09:15:00', '2024-01-03 09:17:00'),
(28, 'completed', '2024-01-03 09:17:00', '2024-01-03 09:21:00'),
(28, 'completed', '2024-01-03 09:21:00', '2024-01-03 09:25:00');

-- For sample 29: 2024-01-03 09:30:00 to 2024-01-03 09:40:00
INSERT INTO observation (sample_id, status, timestamp_start, timestamp_end)
VALUES
(29, 'completed', '2024-01-03 09:30:00', '2024-01-03 09:33:00'),
(29, 'completed', '2024-01-03 09:33:00', '2024-01-03 09:37:00'),
(29, 'completed', '2024-01-03 09:37:00', '2024-01-03 09:40:00');

-- For sample 30: 2024-01-03 09:45:00 to 2024-01-03 09:55:00
INSERT INTO observation (sample_id, status, timestamp_start, timestamp_end)
VALUES
(30, 'completed', '2024-01-03 09:45:00', '2024-01-03 09:47:00'),
(30, 'completed', '2024-01-03 09:47:00', '2024-01-03 09:51:00'),
(30, 'completed', '2024-01-03 09:51:00', '2024-01-03 09:55:00');

-- For sample 31: 2024-01-03 10:00:00 to 2024-01-03 10:10:00 (0 observations)
-- No observations for this sample

-- For sample 32: 2024-01-03 10:15:00 to 2024-01-03 10:25:00 (1 observation)
INSERT INTO observation (sample_id, status, timestamp_start, timestamp_end)
VALUES
(32, 'completed', '2024-01-03 10:15:00', '2024-01-03 10:20:00');

-- For sample 33: 2024-01-03 10:30:00 to 2024-01-03 10:40:00 (3 observations)
INSERT INTO observation (sample_id, status, timestamp_start, timestamp_end)
VALUES
(33, 'completed', '2024-01-03 10:30:00', '2024-01-03 10:33:00'),
(33, 'completed', '2024-01-03 10:33:00', '2024-01-03 10:36:00'),
(33, 'completed', '2024-01-03 10:36:00', '2024-01-03 10:40:00');

-- For sample 34: 2024-01-03 10:45:00 to 2024-01-03 10:55:00 (2 observations)
INSERT INTO observation (sample_id, status, timestamp_start, timestamp_end)
VALUES
(34, 'completed', '2024-01-03 10:45:00', '2024-01-03 10:48:00'),
(34, 'completed', '2024-01-03 10:48:00', '2024-01-03 10:55:00');

-- For sample 35: 2024-01-04 09:00:00 to 2024-01-04 09:10:00 (1 observation)
INSERT INTO observation (sample_id, status, timestamp_start, timestamp_end)
VALUES
(35, 'completed', '2024-01-04 09:00:00', '2024-01-04 09:05:00');

-- For sample 36: 2024-01-04 09:15:00 to 2024-01-04 09:25:00 (3 observations)
INSERT INTO observation (sample_id, status, timestamp_start, timestamp_end)
VALUES
(36, 'completed', '2024-01-04 09:15:00', '2024-01-04 09:18:00'),
(36, 'completed', '2024-01-04 09:18:00', '2024-01-04 09:21:00'),
(36, 'completed', '2024-01-04 09:21:00', '2024-01-04 09:25:00');

-- For sample 37: 2024-01-04 09:30:00 to 2024-01-04 09:40:00 (4 observations)
INSERT INTO observation (sample_id, status, timestamp_start, timestamp_end)
VALUES
(37, 'completed', '2024-01-04 09:30:00', '2024-01-04 09:32:00'),
(37, 'completed', '2024-01-04 09:32:00', '2024-01-04 09:35:00'),
(37, 'completed', '2024-01-04 09:35:00', '2024-01-04 09:38:00'),
(37, 'completed', '2024-01-04 09:38:00', '2024-01-04 09:40:00');

-- For sample 38: 2024-01-04 09:45:00 to 2024-01-04 09:55:00 (5 observations)
INSERT INTO observation (sample_id, status, timestamp_start, timestamp_end)
VALUES
(38, 'completed', '2024-01-04 09:45:00', '2024-01-04 09:47:00'),
(38, 'completed', '2024-01-04 09:47:00', '2024-01-04 09:49:00'),
(38, 'completed', '2024-01-04 09:49:00', '2024-01-04 09:51:00'),
(38, 'completed', '2024-01-04 09:51:00', '2024-01-04 09:53:00'),
(38, 'completed', '2024-01-04 09:53:00', '2024-01-04 09:55:00');

-- For sample 39: 2024-01-04 10:00:00 to 2024-01-04 10:10:00 (0 observations)
-- No observations for this sample

-- For sample 40: 2024-01-04 10:15:00 to 2024-01-04 10:25:00 (2 observations)
INSERT INTO observation (sample_id, status, timestamp_start, timestamp_end)
VALUES
(40, 'completed', '2024-01-04 10:15:00', '2024-01-04 10:18:00'),
(40, 'completed', '2024-01-04 10:18:00', '2024-01-04 10:25:00');

-- For sample 41: 2024-01-04 10:30:00 to 2024-01-04 10:40:00 (3 observations)
INSERT INTO observation (sample_id, status, timestamp_start, timestamp_end)
VALUES
(41, 'completed', '2024-01-04 10:30:00', '2024-01-04 10:32:00'),
(41, 'completed', '2024-01-04 10:32:00', '2024-01-04 10:35:00'),
(41, 'completed', '2024-01-04 10:35:00', '2024-01-04 10:40:00');

-- For sample 42: 2024-01-04 10:45:00 to 2024-01-04 10:55:00 (2 observations)
INSERT INTO observation (sample_id, status, timestamp_start, timestamp_end)
VALUES
(42, 'completed', '2024-01-04 10:45:00', '2024-01-04 10:50:00'),
(42, 'completed', '2024-01-04 10:50:00', '2024-01-04 10:55:00');

-- For sample 43: 2024-01-05 09:00:00 to 2024-01-05 09:10:00 (4 observations)
INSERT INTO observation (sample_id, status, timestamp_start, timestamp_end)
VALUES
(43, 'completed', '2024-01-05 09:00:00', '2024-01-05 09:02:00'),
(43, 'completed', '2024-01-05 09:02:00', '2024-01-05 09:04:00'),
(43, 'completed', '2024-01-05 09:04:00', '2024-01-05 09:07:00'),
(43, 'completed', '2024-01-05 09:07:00', '2024-01-05 09:10:00');

-- For sample 44: 2024-01-05 09:15:00 to 2024-01-05 09:25:00 (1 observation)
INSERT INTO observation (sample_id, status, timestamp_start, timestamp_end)
VALUES
(44, 'completed', '2024-01-05 09:15:00', '2024-01-05 09:20:00');

-- For sample 45: 2024-01-05 09:30:00 to 2024-01-05 09:40:00 (5 observations)
INSERT INTO observation (sample_id, status, timestamp_start, timestamp_end)
VALUES
(45, 'completed', '2024-01-05 09:30:00', '2024-01-05 09:32:00'),
(45, 'completed', '2024-01-05 09:32:00', '2024-01-05 09:34:00'),
(45, 'completed', '2024-01-05 09:34:00', '2024-01-05 09:36:00'),
(45, 'completed', '2024-01-05 09:36:00', '2024-01-05 09:38:00'),
(45, 'completed', '2024-01-05 09:38:00', '2024-01-05 09:40:00');

-- For sample 46: 2024-01-05 09:45:00 to 2024-01-05 09:55:00 (3 observations)
INSERT INTO observation (sample_id, status, timestamp_start, timestamp_end)
VALUES
(46, 'completed', '2024-01-05 09:45:00', '2024-01-05 09:47:00'),
(46, 'completed', '2024-01-05 09:47:00', '2024-01-05 09:50:00'),
(46, 'completed', '2024-01-05 09:50:00', '2024-01-05 09:55:00');

-- For sample 47: 2024-01-05 10:00:00 to 2024-01-05 10:10:00 (0 observations)
-- No observations for this sample

-- For sample 48: 2024-01-05 10:15:00 to 2024-01-05 10:25:00 (2 observations)
INSERT INTO observation (sample_id, status, timestamp_start, timestamp_end)
VALUES
(48, 'completed', '2024-01-05 10:15:00', '2024-01-05 10:20:00'),
(48, 'completed', '2024-01-05 10:20:00', '2024-01-05 10:25:00');

-- For sample 49: 2024-01-05 10:30:00 to 2024-01-05 10:40:00 (1 observation)
INSERT INTO observation (sample_id, status, timestamp_start, timestamp_end)
VALUES
(49, 'completed', '2024-01-05 10:30:00', '2024-01-05 10:35:00');

-- For sample 50: 2024-01-05 10:45:00 to 2024-01-05 10:55:00 (6 observations)
INSERT INTO observation (sample_id, status, timestamp_start, timestamp_end)
VALUES
(50, 'completed', '2024-01-05 10:45:00', '2024-01-05 10:46:00'),
(50, 'completed', '2024-01-05 10:46:00', '2024-01-05 10:47:00'),
(50, 'completed', '2024-01-05 10:47:00', '2024-01-05 10:48:00'),
(50, 'completed', '2024-01-05 10:48:00', '2024-01-05 10:49:00'),
(50, 'completed', '2024-01-05 10:49:00', '2024-01-05 10:50:00'),
(50, 'completed', '2024-01-05 10:50:00', '2024-01-05 10:55:00');

-- For sample 51: 2024-01-06 09:00:00 to 2024-01-06 09:10:00 (4 observations)
INSERT INTO observation (sample_id, status, timestamp_start, timestamp_end)
VALUES
(51, 'completed', '2024-01-06 09:00:00', '2024-01-06 09:02:00'),
(51, 'completed', '2024-01-06 09:02:00', '2024-01-06 09:04:00'),
(51, 'completed', '2024-01-06 09:04:00', '2024-01-06 09:07:00'),
(51, 'completed', '2024-01-06 09:07:00', '2024-01-06 09:10:00');

-- For sample 52: 2024-01-06 09:15:00 to 2024-01-06 09:25:00 (2 observations)
INSERT INTO observation (sample_id, status, timestamp_start, timestamp_end)
VALUES
(52, 'completed', '2024-01-06 09:15:00', '2024-01-06 09:20:00'),
(52, 'completed', '2024-01-06 09:20:00', '2024-01-06 09:25:00');

-- For sample 53: 2024-01-06 09:30:00 to 2024-01-06 09:40:00 (3 observations)
INSERT INTO observation (sample_id, status, timestamp_start, timestamp_end)
VALUES
(53, 'completed', '2024-01-06 09:30:00', '2024-01-06 09:33:00'),
(53, 'completed', '2024-01-06 09:33:00', '2024-01-06 09:36:00'),
(53, 'completed', '2024-01-06 09:36:00', '2024-01-06 09:40:00');

-- For sample 54: 2024-01-06 09:45:00 to 2024-01-06 09:55:00 (0 observations)
-- No observations for this sample

-- For sample 55: 2024-01-06 10:00:00 to 2024-01-06 10:10:00 (1 observation)
INSERT INTO observation (sample_id, status, timestamp_start, timestamp_end)
VALUES
(55, 'completed', '2024-01-06 10:00:00', '2024-01-06 10:05:00');

-- For sample 56: 2024-01-06 10:15:00 to 2024-01-06 10:25:00 (4 observations)
INSERT INTO observation (sample_id, status, timestamp_start, timestamp_end)
VALUES
(56, 'completed', '2024-01-06 10:15:00', '2024-01-06 10:17:00'),
(56, 'completed', '2024-01-06 10:17:00', '2024-01-06 10:19:00'),
(56, 'completed', '2024-01-06 10:19:00', '2024-01-06 10:22:00'),
(56, 'completed', '2024-01-06 10:22:00', '2024-01-06 10:25:00');

-- For sample 57: 2024-01-06 10:30:00 to 2024-01-06 10:40:00 (5 observations)
INSERT INTO observation (sample_id, status, timestamp_start, timestamp_end)
VALUES
(57, 'completed', '2024-01-06 10:30:00', '2024-01-06 10:32:00'),
(57, 'completed', '2024-01-06 10:32:00', '2024-01-06 10:34:00'),
(57, 'completed', '2024-01-06 10:34:00', '2024-01-06 10:36:00'),
(57, 'completed', '2024-01-06 10:36:00', '2024-01-06 10:38:00'),
(57, 'completed', '2024-01-06 10:38:00', '2024-01-06 10:40:00');

-- For sample 58: 2024-01-06 10:45:00 to 2024-01-06 10:55:00 (2 observations)
INSERT INTO observation (sample_id, status, timestamp_start, timestamp_end)
VALUES
(58, 'completed', '2024-01-06 10:45:00', '2024-01-06 10:50:00'),
(58, 'completed', '2024-01-06 10:50:00', '2024-01-06 10:55:00');

-- For sample 59: 2024-01-06 11:00:00 to 2024-01-06 11:10:00 (3 observations)
INSERT INTO observation (sample_id, status, timestamp_start, timestamp_end)
VALUES
(59, 'completed', '2024-01-06 11:00:00', '2024-01-06 11:02:00'),
(59, 'completed', '2024-01-06 11:02:00', '2024-01-06 11:05:00'),
(59, 'completed', '2024-01-06 11:05:00', '2024-01-06 11:10:00');

-- For sample 60: 2024-01-06 11:15:00 to 2024-01-06 11:25:00 (4 observations)
INSERT INTO observation (sample_id, status, timestamp_start, timestamp_end)
VALUES
(60, 'completed', '2024-01-06 11:15:00', '2024-01-06 11:17:00'),
(60, 'completed', '2024-01-06 11:17:00', '2024-01-06 11:19:00'),
(60, 'completed', '2024-01-06 11:19:00', '2024-01-06 11:22:00'),
(60, 'completed', '2024-01-06 11:22:00', '2024-01-06 11:25:00');

-- For sample 61: 2024-01-07 09:00:00 to 2024-01-07 09:10:00 (3 observations)
INSERT INTO observation (sample_id, status, timestamp_start, timestamp_end)
VALUES
(61, 'completed', '2024-01-07 09:00:00', '2024-01-07 09:03:00'),
(61, 'completed', '2024-01-07 09:03:00', '2024-01-07 09:06:00'),
(61, 'completed', '2024-01-07 09:06:00', '2024-01-07 09:10:00');

-- For sample 62: 2024-01-07 09:15:00 to 2024-01-07 09:25:00 (1 observation)
INSERT INTO observation (sample_id, status, timestamp_start, timestamp_end)
VALUES
(62, 'completed', '2024-01-07 09:15:00', '2024-01-07 09:20:00');

-- For sample 63: 2024-01-07 09:30:00 to 2024-01-07 09:40:00 (0 observations)
-- No observations for this sample

-- For sample 64: 2024-01-07 09:45:00 to 2024-01-07 09:55:00 (2 observations)
INSERT INTO observation (sample_id, status, timestamp_start, timestamp_end)
VALUES
(64, 'completed', '2024-01-07 09:45:00', '2024-01-07 09:50:00'),
(64, 'completed', '2024-01-07 09:50:00', '2024-01-07 09:55:00');

-- For sample 65: 2024-01-07 10:00:00 to 2024-01-07 10:10:00 (3 observations)
INSERT INTO observation (sample_id, status, timestamp_start, timestamp_end)
VALUES
(65, 'completed', '2024-01-07 10:00:00', '2024-01-07 10:03:00'),
(65, 'completed', '2024-01-07 10:03:00', '2024-01-07 10:06:00'),
(65, 'completed', '2024-01-07 10:06:00', '2024-01-07 10:10:00');

-- For sample 66: 2024-01-07 10:15:00 to 2024-01-07 10:25:00 (4 observations)
INSERT INTO observation (sample_id, status, timestamp_start, timestamp_end)
VALUES
(66, 'completed', '2024-01-07 10:15:00', '2024-01-07 10:17:00'),
(66, 'completed', '2024-01-07 10:17:00', '2024-01-07 10:19:00'),
(66, 'completed', '2024-01-07 10:19:00', '2024-01-07 10:22:00'),
(66, 'completed', '2024-01-07 10:22:00', '2024-01-07 10:25:00');

-- For sample 67: 2024-01-07 10:30:00 to 2024-01-07 10:40:00 (2 observations)
INSERT INTO observation (sample_id, status, timestamp_start, timestamp_end)
VALUES
(67, 'completed', '2024-01-07 10:30:00', '2024-01-07 10:35:00'),
(67, 'completed', '2024-01-07 10:35:00', '2024-01-07 10:40:00');

-- For sample 68: 2024-01-07 10:45:00 to 2024-01-07 10:55:00 (1 observation)
INSERT INTO observation (sample_id, status, timestamp_start, timestamp_end)
VALUES
(68, 'completed', '2024-01-07 10:45:00', '2024-01-07 10:50:00');

-- For sample 69: 2024-01-07 11:00:00 to 2024-01-07 11:10:00 (6 observations)
INSERT INTO observation (sample_id, status, timestamp_start, timestamp_end)
VALUES
(69, 'completed', '2024-01-07 11:00:00', '2024-01-07 11:01:00'),
(69, 'completed', '2024-01-07 11:01:00', '2024-01-07 11:02:00'),
(69, 'completed', '2024-01-07 11:02:00', '2024-01-07 11:03:00'),
(69, 'completed', '2024-01-07 11:03:00', '2024-01-07 11:04:00'),
(69, 'completed', '2024-01-07 11:04:00', '2024-01-07 11:05:00'),
(69, 'completed', '2024-01-07 11:05:00', '2024-01-07 11:10:00');

-- For sample 70: 2024-01-07 11:15:00 to 2024-01-07 11:25:00 (0 observations)
-- No observations for this sample

-- For sample 71: 2024-01-08 09:00:00 to 2024-01-08 09:10:00 (1 observation)
INSERT INTO observation (sample_id, status, timestamp_start, timestamp_end)
VALUES
(71, 'completed', '2024-01-08 09:00:00', '2024-01-08 09:05:00');

-- For sample 72: 2024-01-08 09:15:00 to 2024-01-08 09:25:00 (2 observations)
INSERT INTO observation (sample_id, status, timestamp_start, timestamp_end)
VALUES
(72, 'completed', '2024-01-08 09:15:00', '2024-01-08 09:20:00'),
(72, 'completed', '2024-01-08 09:20:00', '2024-01-08 09:25:00');

-- For sample 73: 2024-01-08 09:30:00 to 2024-01-08 09:40:00 (3 observations)
INSERT INTO observation (sample_id, status, timestamp_start, timestamp_end)
VALUES
(73, 'completed', '2024-01-08 09:30:00', '2024-01-08 09:32:00'),
(73, 'completed', '2024-01-08 09:32:00', '2024-01-08 09:35:00'),
(73, 'completed', '2024-01-08 09:35:00', '2024-01-08 09:40:00');

-- For sample 74: 2024-01-08 09:45:00 to 2024-01-08 09:55:00 (4 observations)
INSERT INTO observation (sample_id, status, timestamp_start, timestamp_end)
VALUES
(74, 'completed', '2024-01-08 09:45:00', '2024-01-08 09:47:00'),
(74, 'completed', '2024-01-08 09:47:00', '2024-01-08 09:49:00'),
(74, 'completed', '2024-01-08 09:49:00', '2024-01-08 09:52:00'),
(74, 'completed', '2024-01-08 09:52:00', '2024-01-08 09:55:00');

-- For sample 75: 2024-01-08 10:00:00 to 2024-01-08 10:10:00 (2 observations)
INSERT INTO observation (sample_id, status, timestamp_start, timestamp_end)
VALUES
(75, 'completed', '2024-01-08 10:00:00', '2024-01-08 10:03:00'),
(75, 'completed', '2024-01-08 10:03:00', '2024-01-08 10:06:00');

-- For sample 76: 2024-01-08 10:15:00 to 2024-01-08 10:25:00 (0 observations)
-- No observations for this sample

-- For sample 77: 2024-01-08 10:30:00 to 2024-01-08 10:40:00 (3 observations)
INSERT INTO observation (sample_id, status, timestamp_start, timestamp_end)
VALUES
(77, 'completed', '2024-01-08 10:30:00', '2024-01-08 10:32:00'),
(77, 'completed', '2024-01-08 10:32:00', '2024-01-08 10:35:00'),
(77, 'completed', '2024-01-08 10:35:00', '2024-01-08 10:40:00');

-- For sample 78: 2024-01-08 10:45:00 to 2024-01-08 10:55:00 (4 observations)
INSERT INTO observation (sample_id, status, timestamp_start, timestamp_end)
VALUES
(78, 'completed', '2024-01-08 10:45:00', '2024-01-08 10:47:00'),
(78, 'completed', '2024-01-08 10:47:00', '2024-01-08 10:50:00'),
(78, 'completed', '2024-01-08 10:50:00', '2024-01-08 10:52:00'),
(78, 'completed', '2024-01-08 10:52:00', '2024-01-08 10:55:00');

-- For sample 79: 2024-01-08 11:00:00 to 2024-01-08 11:10:00 (1 observation)
INSERT INTO observation (sample_id, status, timestamp_start, timestamp_end)
VALUES
(79, 'completed', '2024-01-08 11:00:00', '2024-01-08 11:05:00');

-- For sample 80: 2024-01-08 11:15:00 to 2024-01-08 11:25:00 (0 observations)
-- No observations for this sample

-- For sample 81: 2024-01-09 09:00:00 to 2024-01-09 09:10:00 (2 observations)
INSERT INTO observation (sample_id, status, timestamp_start, timestamp_end)
VALUES
(81, 'completed', '2024-01-09 09:00:00', '2024-01-09 09:04:00'),
(81, 'completed', '2024-01-09 09:04:00', '2024-01-09 09:10:00');

-- For sample 82: 2024-01-09 09:15:00 to 2024-01-09 09:25:00 (1 observation)
INSERT INTO observation (sample_id, status, timestamp_start, timestamp_end)
VALUES
(82, 'completed', '2024-01-09 09:15:00', '2024-01-09 09:20:00');

-- For sample 83: 2024-01-09 09:30:00 to 2024-01-09 09:40:00 (0 observations)
-- No observations for this sample

-- For sample 84: 2024-01-09 09:45:00 to 2024-01-09 09:55:00 (3 observations)
INSERT INTO observation (sample_id, status, timestamp_start, timestamp_end)
VALUES
(84, 'completed', '2024-01-09 09:45:00', '2024-01-09 09:47:00'),
(84, 'completed', '2024-01-09 09:47:00', '2024-01-09 09:50:00'),
(84, 'completed', '2024-01-09 09:50:00', '2024-01-09 09:55:00');

-- For sample 85: 2024-01-09 10:00:00 to 2024-01-09 10:10:00 (5 observations)
INSERT INTO observation (sample_id, status, timestamp_start, timestamp_end)
VALUES
(85, 'completed', '2024-01-09 10:00:00', '2024-01-09 10:01:00'),
(85, 'completed', '2024-01-09 10:01:00', '2024-01-09 10:02:00'),
(85, 'completed', '2024-01-09 10:02:00', '2024-01-09 10:04:00'),
(85, 'completed', '2024-01-09 10:04:00', '2024-01-09 10:06:00'),
(85, 'completed', '2024-01-09 10:06:00', '2024-01-09 10:10:00');

-- For sample 86: 2024-01-09 10:15:00 to 2024-01-09 10:25:00 (0 observations)
-- No observations for this sample

-- For sample 87: 2024-01-09 10:30:00 to 2024-01-09 10:40:00 (2 observations)
INSERT INTO observation (sample_id, status, timestamp_start, timestamp_end)
VALUES
(87, 'completed', '2024-01-09 10:30:00', '2024-01-09 10:34:00'),
(87, 'completed', '2024-01-09 10:34:00', '2024-01-09 10:40:00');

-- For sample 88: 2024-01-09 10:45:00 to 2024-01-09 10:55:00 (4 observations)
INSERT INTO observation (sample_id, status, timestamp_start, timestamp_end)
VALUES
(88, 'completed', '2024-01-09 10:45:00', '2024-01-09 10:46:00'),
(88, 'completed', '2024-01-09 10:46:00', '2024-01-09 10:48:00'),
(88, 'completed', '2024-01-09 10:48:00', '2024-01-09 10:51:00'),
(88, 'completed', '2024-01-09 10:51:00', '2024-01-09 10:55:00');

-- For sample 89: 2024-01-09 11:00:00 to 2024-01-09 11:10:00 (1 observation)
INSERT INTO observation (sample_id, status, timestamp_start, timestamp_end)
VALUES
(89, 'completed', '2024-01-09 11:00:00', '2024-01-09 11:05:00');

-- For sample 90: 2024-01-09 11:15:00 to 2024-01-09 11:25:00 (0 observations)
-- No observations for this sample

-- For sample 91: 2024-01-10 09:00:00 to 2024-01-10 09:10:00 (3 observations)
INSERT INTO observation (sample_id, status, timestamp_start, timestamp_end)
VALUES
(91, 'completed', '2024-01-10 09:00:00', '2024-01-10 09:03:00'),
(91, 'completed', '2024-01-10 09:03:00', '2024-01-10 09:06:00'),
(91, 'completed', '2024-01-10 09:06:00', '2024-01-10 09:10:00');

-- For sample 92: 2024-01-10 09:15:00 to 2024-01-10 09:25:00 (1 observation)
INSERT INTO observation (sample_id, status, timestamp_start, timestamp_end)
VALUES
(92, 'completed', '2024-01-10 09:15:00', '2024-01-10 09:20:00');

-- For sample 93: 2024-01-10 09:30:00 to 2024-01-10 09:40:00 (4 observations)
INSERT INTO observation (sample_id, status, timestamp_start, timestamp_end)
VALUES
(93, 'completed', '2024-01-10 09:30:00', '2024-01-10 09:32:00'),
(93, 'completed', '2024-01-10 09:32:00', '2024-01-10 09:35:00'),
(93, 'completed', '2024-01-10 09:35:00', '2024-01-10 09:38:00'),
(93, 'completed', '2024-01-10 09:38:00', '2024-01-10 09:40:00');

-- For sample 94: 2024-01-10 09:45:00 to 2024-01-10 09:55:00 (0 observations)
-- No observations for this sample

-- For sample 95: 2024-01-10 10:00:00 to 2024-01-10 10:10:00 (2 observations)
INSERT INTO observation (sample_id, status, timestamp_start, timestamp_end)
VALUES
(95, 'completed', '2024-01-10 10:00:00', '2024-01-10 10:03:00'),
(95, 'completed', '2024-01-10 10:03:00', '2024-01-10 10:06:00');

-- For sample 96: 2024-01-10 10:15:00 to 2024-01-10 10:25:00 (5 observations)
INSERT INTO observation (sample_id, status, timestamp_start, timestamp_end)
VALUES
(96, 'completed', '2024-01-10 10:15:00', '2024-01-10 10:17:00'),
(96, 'completed', '2024-01-10 10:17:00', '2024-01-10 10:19:00'),
(96, 'completed', '2024-01-10 10:19:00', '2024-01-10 10:21:00'),
(96, 'completed', '2024-01-10 10:21:00', '2024-01-10 10:23:00'),
(96, 'completed', '2024-01-10 10:23:00', '2024-01-10 10:25:00');

-- For sample 97: 2024-01-10 10:30:00 to 2024-01-10 10:40:00 (0 observations)
-- No observations for this sample

-- For sample 98: 2024-01-10 10:45:00 to 2024-01-10 10:55:00 (3 observations)
INSERT INTO observation (sample_id, status, timestamp_start, timestamp_end)
VALUES
(98, 'completed', '2024-01-10 10:45:00', '2024-01-10 10:47:00'),
(98, 'completed', '2024-01-10 10:47:00', '2024-01-10 10:50:00'),
(98, 'completed', '2024-01-10 10:50:00', '2024-01-10 10:55:00');

-- For sample 99: 2024-01-10 11:00:00 to 2024-01-10 11:10:00 (1 observation)
INSERT INTO observation (sample_id, status, timestamp_start, timestamp_end)
VALUES
(99, 'completed', '2024-01-10 11:00:00', '2024-01-10 11:05:00');

-- For sample 100: 2024-01-10 11:15:00 to 2024-01-10 11:25:00 (2 observations)
INSERT INTO observation (sample_id, status, timestamp_start, timestamp_end)
VALUES
(100, 'completed', '2024-01-10 11:15:00', '2024-01-10 11:17:00'),
(100, 'completed', '2024-01-10 11:17:00', '2024-01-10 11:20:00');




-- For observation 1
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 1, 'Male'),          -- Monkey gender
(2, 1, '1'),             -- Monkey group
(3, 1, 'good'),          -- Monkey health
(4, 1, 'adult'),         -- Monkey age
(5, 1, 'Aggressive level 1'), -- Interaction
(6, 1, 1);          -- Visible Food

-- For observation 2
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 2, 'Female'),        -- Monkey gender
(2, 2, '2'),             -- Monkey group
(3, 2, 'good'),          -- Monkey health
(4, 2, 'teenage'),       -- Monkey age
(5, 2, 'Aggressive level 2'), -- Interaction
(6, 2, 0);         -- Visible Food

-- For observation 3
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 3, 'Male'),          -- Monkey gender
(2, 3, '3'),             -- Monkey group
(3, 3, 'good'),          -- Monkey health
(4, 3, 'child'),         -- Monkey age
(5, 3, 'Physical contact'), -- Interaction
(6, 3, 1);          -- Visible Food

-- For observation 4
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 4, 'Female'),        -- Monkey gender
(2, 4, '1'),             -- Monkey group
(3, 4, 'good'),          -- Monkey health
(4, 4, 'adult'),         -- Monkey age
(5, 4, 'Aggressive level 3'), -- Interaction
(6, 4, 0);         -- Visible Food

-- For observation 5
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 5, 'Male'),          -- Monkey gender
(2, 5, '2'),             -- Monkey group
(3, 5, 'good'),          -- Monkey health
(4, 5, 'adult'),         -- Monkey age
(5, 5, 'Physical contact'), -- Interaction
(6, 5, 1);          -- Visible Food

-- For observation 6
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 6, 'Female'),        -- Monkey gender
(2, 6, '3'),             -- Monkey group
(3, 6, 'good'),          -- Monkey health
(4, 6, 'teenage'),       -- Monkey age
(5, 6, 'Aggressive level 1'), -- Interaction
(6, 6, 0);         -- Visible Food

-- For observation 7
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 7, 'Male'),          -- Monkey gender
(2, 7, '1'),             -- Monkey group
(3, 7, 'good'),          -- Monkey health
(4, 7, 'child'),         -- Monkey age
(5, 7, 'Aggressive level 2'), -- Interaction
(6, 7, 1);          -- Visible Food

-- For observation 8
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 8, 'Female'),        -- Monkey gender
(2, 8, '2'),             -- Monkey group
(3, 8, 'good'),          -- Monkey health
(4, 8, 'adult'),         -- Monkey age
(5, 8, 'Physical contact'), -- Interaction
(6, 8, 0);         -- Visible Food

-- For observation 9
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 9, 'Male'),          -- Monkey gender
(2, 9, '3'),             -- Monkey group
(3, 9, 'good'),          -- Monkey health
(4, 9, 'teenage'),       -- Monkey age
(5, 9, 'Aggressive level 3'), -- Interaction
(6, 9, 1);          -- Visible Food

-- For observation 10
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 10, 'Female'),       -- Monkey gender
(2, 10, '1'),            -- Monkey group
(3, 10, 'good'),         -- Monkey health
(4, 10, 'adult'),        -- Monkey age
(5, 10, 'Aggressive level 1'), -- Interaction
(6, 10, 0);        -- Visible Food

-- For observation 11
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 11, 'Male'),         -- Monkey gender
(2, 11, '2'),            -- Monkey group
(3, 11, 'good'),         -- Monkey health
(4, 11, 'child'),        -- Monkey age
(5, 11, 'Aggressive level 2'), -- Interaction
(6, 11, 1);         -- Visible Food

-- For observation 12
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 12, 'Female'),       -- Monkey gender
(2, 12, '3'),            -- Monkey group
(3, 12, 'good'),         -- Monkey health
(4, 12, 'adult'),        -- Monkey age
(5, 12, 'Aggressive level 1'), -- Interaction
(6, 12, 0);        -- Visible Food

-- For observation 13
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 13, 'Male'),         -- Monkey gender
(2, 13, '1'),            -- Monkey group
(3, 13, 'good'),         -- Monkey health
(4, 13, 'teenage'),      -- Monkey age
(5, 13, 'Aggressive level 3'), -- Interaction
(6, 13, 1);         -- Visible Food

-- For observation 14
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 14, 'Female'),       -- Monkey gender
(2, 14, '2'),            -- Monkey group
(3, 14, 'good'),         -- Monkey health
(4, 14, 'adult'),        -- Monkey age
(5, 14, 'Physical contact'), -- Interaction
(6, 14, 0);        -- Visible Food

-- For observation 15
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 15, 'Male'),         -- Monkey gender
(2, 15, '3'),            -- Monkey group
(3, 15, 'good'),         -- Monkey health
(4, 15, 'child'),        -- Monkey age
(5, 15, 'Aggressive level 1'), -- Interaction
(6, 15, 1);         -- Visible Food

-- For observation 16
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 16, 'Female'),       -- Monkey gender
(2, 16, '1'),            -- Monkey group
(3, 16, 'good'),         -- Monkey health
(4, 16, 'teenage'),      -- Monkey age
(5, 16, 'Aggressive level 2'), -- Interaction
(6, 16, 0);        -- Visible Food

-- For observation 17
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 17, 'Male'),         -- Monkey gender
(2, 17, '2'),            -- Monkey group
(3, 17, 'good'),         -- Monkey health
(4, 17, 'adult'),        -- Monkey age
(5, 17, 'Aggressive level 3'), -- Interaction
(6, 17, 1);         -- Visible Food

-- For observation 18
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 18, 'Female'),       -- Monkey gender
(2, 18, '3'),            -- Monkey group
(3, 18, 'good'),         -- Monkey health
(4, 18, 'child'),        -- Monkey age
(5, 18, 'Physical contact'), -- Interaction
(6, 18, 0);        -- Visible Food

-- For observation 19
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 19, 'Male'),         -- Monkey gender
(2, 19, '1'),            -- Monkey group
(3, 19, 'good'),         -- Monkey health
(4, 19, 'teenage'),      -- Monkey age
(5, 19, 'Aggressive level 1'), -- Interaction
(6, 19, 1);         -- Visible Food

-- For observation 20
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 20, 'Female'),       -- Monkey gender
(2, 20, '2'),            -- Monkey group
(3, 20, 'good'),         -- Monkey health
(4, 20, 'adult'),        -- Monkey age
(5, 20, 'Aggressive level 2'), -- Interaction
(6, 20, 0);        -- Visible Food

-- For observation 21
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 21, 'Male'),         -- Monkey gender
(2, 21, '3'),            -- Monkey group
(3, 21, 'good'),         -- Monkey health
(4, 21, 'child'),        -- Monkey age
(5, 21, 'Physical contact'), -- Interaction
(6, 21, 1);         -- Visible Food

-- For observation 22
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 22, 'Female'),       -- Monkey gender
(2, 22, '1'),            -- Monkey group
(3, 22, 'good'),         -- Monkey health
(4, 22, 'teenage'),      -- Monkey age
(5, 22, 'Aggressive level 3'), -- Interaction
(6, 22, 0);        -- Visible Food

-- For observation 23
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 23, 'Male'),         -- Monkey gender
(2, 23, '2'),            -- Monkey group
(3, 23, 'good'),         -- Monkey health
(4, 23, 'adult'),        -- Monkey age
(5, 23, 'Aggressive level 1'), -- Interaction
(6, 23, 1);         -- Visible Food

-- For observation 24
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 24, 'Female'),       -- Monkey gender
(2, 24, '3'),            -- Monkey group
(3, 24, 'good'),         -- Monkey health
(4, 24, 'child'),        -- Monkey age
(5, 24, 'Aggressive level 2'), -- Interaction
(6, 24, 0);        -- Visible Food

-- For observation 25
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 25, 'Male'),         -- Monkey gender
(2, 25, '1'),            -- Monkey group
(3, 25, 'good'),         -- Monkey health
(4, 25, 'teenage'),      -- Monkey age
(5, 25, 'Physical contact'), -- Interaction
(6, 25, 1);         -- Visible Food

-- For observation 26
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 26, 'Female'),       -- Monkey gender
(2, 26, '2'),            -- Monkey group
(3, 26, 'good'),         -- Monkey health
(4, 26, 'adult'),        -- Monkey age
(5, 26, 'Aggressive level 3'), -- Interaction
(6, 26, 0);        -- Visible Food

-- For observation 27
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 27, 'Male'),         -- Monkey gender
(2, 27, '3'),            -- Monkey group
(3, 27, 'good'),         -- Monkey health
(4, 27, 'child'),        -- Monkey age
(5, 27, 'Aggressive level 1'), -- Interaction
(6, 27, 1);         -- Visible Food

-- For observation 28
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 28, 'Female'),       -- Monkey gender
(2, 28, '1'),            -- Monkey group
(3, 28, 'good'),         -- Monkey health
(4, 28, 'teenage'),      -- Monkey age
(5, 28, 'Aggressive level 2'), -- Interaction
(6, 28, 0);        -- Visible Food

-- For observation 29
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 29, 'Male'),         -- Monkey gender
(2, 29, '2'),            -- Monkey group
(3, 29, 'good'),         -- Monkey health
(4, 29, 'adult'),        -- Monkey age
(5, 29, 'Aggressive level 3'), -- Interaction
(6, 29, 1);         -- Visible Food

-- For observation 30
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 30, 'Female'),       -- Monkey gender
(2, 30, '3'),            -- Monkey group
(3, 30, 'good'),         -- Monkey health
(4, 30, 'child'),        -- Monkey age
(5, 30, 'Physical contact'), -- Interaction
(6, 30, 0);        -- Visible Food

-- For observation 31
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 31, 'Male'),         -- Monkey gender
(2, 31, '1'),            -- Monkey group
(3, 31, 'good'),         -- Monkey health
(4, 31, 'teenage'),      -- Monkey age
(5, 31, 'Aggressive level 2'), -- Interaction
(6, 31, 1);         -- Visible Food

-- For observation 32
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 32, 'Female'),       -- Monkey gender
(2, 32, '2'),            -- Monkey group
(3, 32, 'good'),         -- Monkey health
(4, 32, 'adult'),        -- Monkey age
(5, 32, 'Aggressive level 1'), -- Interaction
(6, 32, 0);        -- Visible Food

-- For observation 33
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 33, 'Male'),         -- Monkey gender
(2, 33, '3'),            -- Monkey group
(3, 33, 'good'),         -- Monkey health
(4, 33, 'child'),        -- Monkey age
(5, 33, 'Aggressive level 3'), -- Interaction
(6, 33, 1);         -- Visible Food

-- For observation 34
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 34, 'Female'),       -- Monkey gender
(2, 34, '1'),            -- Monkey group
(3, 34, 'good'),         -- Monkey health
(4, 34, 'teenage'),      -- Monkey age
(5, 34, 'Physical contact'), -- Interaction
(6, 34, 0);        -- Visible Food

-- For observation 35
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 35, 'Male'),         -- Monkey gender
(2, 35, '2'),            -- Monkey group
(3, 35, 'good'),         -- Monkey health
(4, 35, 'adult'),        -- Monkey age
(5, 35, 'Aggressive level 1'), -- Interaction
(6, 35, 1);         -- Visible Food

-- For observation 36
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 36, 'Female'),       -- Monkey gender
(2, 36, '3'),            -- Monkey group
(3, 36, 'good'),         -- Monkey health
(4, 36, 'child'),        -- Monkey age
(5, 36, 'Aggressive level 2'), -- Interaction
(6, 36, 0);        -- Visible Food

-- For observation 37
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 37, 'Male'),         -- Monkey gender
(2, 37, '1'),            -- Monkey group
(3, 37, 'good'),         -- Monkey health
(4, 37, 'teenage'),      -- Monkey age
(5, 37, 'Aggressive level 3'), -- Interaction
(6, 37, 1);         -- Visible Food

-- For observation 38
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 38, 'Female'),       -- Monkey gender
(2, 38, '2'),            -- Monkey group
(3, 38, 'good'),         -- Monkey health
(4, 38, 'adult'),        -- Monkey age
(5, 38, 'Aggressive level 1'), -- Interaction
(6, 38, 0);        -- Visible Food

-- For observation 39
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 39, 'Male'),         -- Monkey gender
(2, 39, '3'),            -- Monkey group
(3, 39, 'good'),         -- Monkey health
(4, 39, 'child'),        -- Monkey age
(5, 39, 'Physical contact'), -- Interaction
(6, 39, 1);         -- Visible Food

-- For observation 40
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 40, 'Female'),       -- Monkey gender
(2, 40, '1'),            -- Monkey group
(3, 40, 'good'),         -- Monkey health
(4, 40, 'teenage'),      -- Monkey age
(5, 40, 'Aggressive level 2'), -- Interaction
(6, 40, 0);        -- Visible Food

-- For observation 41
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 41, 'Male'),         -- Monkey gender
(2, 41, '2'),            -- Monkey group
(3, 41, 'good'),         -- Monkey health
(4, 41, 'adult'),        -- Monkey age
(5, 41, 'Aggressive level 3'), -- Interaction
(6, 41, 1);         -- Visible Food

-- For observation 42
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 42, 'Female'),       -- Monkey gender
(2, 42, '3'),            -- Monkey group
(3, 42, 'good'),         -- Monkey health
(4, 42, 'child'),        -- Monkey age
(5, 42, 'Aggressive level 1'), -- Interaction
(6, 42, 0);        -- Visible Food

-- For observation 43
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 43, 'Male'),         -- Monkey gender
(2, 43, '1'),            -- Monkey group
(3, 43, 'good'),         -- Monkey health
(4, 43, 'teenage'),      -- Monkey age
(5, 43, 'Aggressive level 2'), -- Interaction
(6, 43, 1);         -- Visible Food

-- For observation 44
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 44, 'Female'),       -- Monkey gender
(2, 44, '2'),            -- Monkey group
(3, 44, 'good'),         -- Monkey health
(4, 44, 'adult'),        -- Monkey age
(5, 44, 'Aggressive level 3'), -- Interaction
(6, 44, 0);        -- Visible Food

-- For observation 45
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 45, 'Male'),         -- Monkey gender
(2, 45, '3'),            -- Monkey group
(3, 45, 'good'),         -- Monkey health
(4, 45, 'child'),        -- Monkey age
(5, 45, 'Physical contact'), -- Interaction
(6, 45, 1);         -- Visible Food

-- For observation 46
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 46, 'Female'),       -- Monkey gender
(2, 46, '1'),            -- Monkey group
(3, 46, 'good'),         -- Monkey health
(4, 46, 'teenage'),      -- Monkey age
(5, 46, 'Aggressive level 1'), -- Interaction
(6, 46, 0);        -- Visible Food

-- For observation 47
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 47, 'Male'),         -- Monkey gender
(2, 47, '2'),            -- Monkey group
(3, 47, 'good'),         -- Monkey health
(4, 47, 'adult'),        -- Monkey age
(5, 47, 'Aggressive level 2'), -- Interaction
(6, 47, 1);         -- Visible Food

-- For observation 48
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 48, 'Female'),       -- Monkey gender
(2, 48, '3'),            -- Monkey group
(3, 48, 'good'),         -- Monkey health
(4, 48, 'child'),        -- Monkey age
(5, 48, 'Aggressive level 3'), -- Interaction
(6, 48, 0);        -- Visible Food

-- For observation 49
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 49, 'Male'),         -- Monkey gender
(2, 49, '1'),            -- Monkey group
(3, 49, 'good'),         -- Monkey health
(4, 49, 'teenage'),      -- Monkey age
(5, 49, 'Physical contact'), -- Interaction
(6, 49, 1);         -- Visible Food

-- For observation 50
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 50, 'Female'),       -- Monkey gender
(2, 50, '2'),            -- Monkey group
(3, 50, 'good'),         -- Monkey health
(4, 50, 'adult'),        -- Monkey age
(5, 50, 'Aggressive level 1'), -- Interaction
(6, 50, 0);        -- Visible Food

-- For observation 51
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 51, 'Male'),         -- Monkey gender
(2, 51, '1'),            -- Monkey group
(3, 51, 'good'),         -- Monkey health
(4, 51, 'adult'),        -- Monkey age
(5, 51, 'Aggressive level 2'), -- Interaction
(6, 51, 1);         -- Visible Food

-- For observation 52
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 52, 'Female'),       -- Monkey gender
(2, 52, '2'),            -- Monkey group
(3, 52, 'good'),         -- Monkey health
(4, 52, 'teenage'),      -- Monkey age
(5, 52, 'Aggressive level 3'), -- Interaction
(6, 52, 0);        -- Visible Food

-- For observation 53
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 53, 'Male'),         -- Monkey gender
(2, 53, '3'),            -- Monkey group
(3, 53, 'good'),         -- Monkey health
(4, 53, 'child'),        -- Monkey age
(5, 53, 'Physical contact'), -- Interaction
(6, 53, 1);         -- Visible Food

-- For observation 54
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 54, 'Female'),       -- Monkey gender
(2, 54, '1'),            -- Monkey group
(3, 54, 'good'),         -- Monkey health
(4, 54, 'adult'),        -- Monkey age
(5, 54, 'Aggressive level 1'), -- Interaction
(6, 54, 0);        -- Visible Food

-- For observation 55
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 55, 'Male'),         -- Monkey gender
(2, 55, '2'),            -- Monkey group
(3, 55, 'good'),         -- Monkey health
(4, 55, 'teenage'),      -- Monkey age
(5, 55, 'Aggressive level 2'), -- Interaction
(6, 55, 1);         -- Visible Food

-- For observation 56
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 56, 'Female'),       -- Monkey gender
(2, 56, '3'),            -- Monkey group
(3, 56, 'good'),         -- Monkey health
(4, 56, 'child'),        -- Monkey age
(5, 56, 'Aggressive level 1'), -- Interaction
(6, 56, 0);        -- Visible Food

-- For observation 57
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 57, 'Male'),         -- Monkey gender
(2, 57, '1'),            -- Monkey group
(3, 57, 'good'),         -- Monkey health
(4, 57, 'adult'),        -- Monkey age
(5, 57, 'Aggressive level 3'), -- Interaction
(6, 57, 1);         -- Visible Food

-- For observation 58
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 58, 'Female'),       -- Monkey gender
(2, 58, '2'),            -- Monkey group
(3, 58, 'good'),         -- Monkey health
(4, 58, 'teenage'),      -- Monkey age
(5, 58, 'Physical contact'), -- Interaction
(6, 58, 0);        -- Visible Food

-- For observation 59
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 59, 'Male'),         -- Monkey gender
(2, 59, '3'),            -- Monkey group
(3, 59, 'good'),         -- Monkey health
(4, 59, 'child'),        -- Monkey age
(5, 59, 'Aggressive level 2'), -- Interaction
(6, 59, 1);         -- Visible Food

-- For observation 60
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 60, 'Female'),       -- Monkey gender
(2, 60, '1'),            -- Monkey group
(3, 60, 'good'),         -- Monkey health
(4, 60, 'adult'),        -- Monkey age
(5, 60, 'Aggressive level 1'), -- Interaction
(6, 60, 0);        -- Visible Food

-- For observation 61
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 61, 'Male'),         -- Monkey gender
(2, 61, '2'),            -- Monkey group
(3, 61, 'good'),         -- Monkey health
(4, 61, 'teenage'),      -- Monkey age
(5, 61, 'Aggressive level 3'), -- Interaction
(6, 61, 1);         -- Visible Food

-- For observation 62
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 62, 'Female'),       -- Monkey gender
(2, 62, '3'),            -- Monkey group
(3, 62, 'good'),         -- Monkey health
(4, 62, 'child'),        -- Monkey age
(5, 62, 'Physical contact'), -- Interaction
(6, 62, 0);        -- Visible Food

-- For observation 63
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 63, 'Male'),         -- Monkey gender
(2, 63, '1'),            -- Monkey group
(3, 63, 'good'),         -- Monkey health
(4, 63, 'adult'),        -- Monkey age
(5, 63, 'Aggressive level 2'), -- Interaction
(6, 63, 1);         -- Visible Food

-- For observation 64
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 64, 'Female'),       -- Monkey gender
(2, 64, '2'),            -- Monkey group
(3, 64, 'good'),         -- Monkey health
(4, 64, 'teenage'),      -- Monkey age
(5, 64, 'Aggressive level 1'), -- Interaction
(6, 64, 0);        -- Visible Food

-- For observation 65
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 65, 'Male'),         -- Monkey gender
(2, 65, '3'),            -- Monkey group
(3, 65, 'good'),         -- Monkey health
(4, 65, 'child'),        -- Monkey age
(5, 65, 'Aggressive level 3'), -- Interaction
(6, 65, 1);         -- Visible Food

-- For observation 66
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 66, 'Female'),       -- Monkey gender
(2, 66, '1'),            -- Monkey group
(3, 66, 'good'),         -- Monkey health
(4, 66, 'adult'),        -- Monkey age
(5, 66, 'Physical contact'), -- Interaction
(6, 66, 0);        -- Visible Food

-- For observation 67
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 67, 'Male'),         -- Monkey gender
(2, 67, '2'),            -- Monkey group
(3, 67, 'good'),         -- Monkey health
(4, 67, 'teenage'),      -- Monkey age
(5, 67, 'Aggressive level 1'), -- Interaction
(6, 67, 1);         -- Visible Food

-- For observation 68
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 68, 'Female'),       -- Monkey gender
(2, 68, '3'),            -- Monkey group
(3, 68, 'good'),         -- Monkey health
(4, 68, 'child'),        -- Monkey age
(5, 68, 'Aggressive level 2'), -- Interaction
(6, 68, 0);        -- Visible Food

-- For observation 69
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 69, 'Male'),         -- Monkey gender
(2, 69, '1'),            -- Monkey group
(3, 69, 'good'),         -- Monkey health
(4, 69, 'adult'),        -- Monkey age
(5, 69, 'Aggressive level 3'), -- Interaction
(6, 69, 1);         -- Visible Food

-- For observation 70
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 70, 'Female'),       -- Monkey gender
(2, 70, '2'),            -- Monkey group
(3, 70, 'good'),         -- Monkey health
(4, 70, 'teenage'),      -- Monkey age
(5, 70, 'Physical contact'), -- Interaction
(6, 70, 0);        -- Visible Food

-- For observation 71
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 71, 'Male'),         -- Monkey gender
(2, 71, '3'),            -- Monkey group
(3, 71, 'good'),         -- Monkey health
(4, 71, 'child'),        -- Monkey age
(5, 71, 'Aggressive level 1'), -- Interaction
(6, 71, 1);         -- Visible Food

-- For observation 72
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 72, 'Female'),       -- Monkey gender
(2, 72, '1'),            -- Monkey group
(3, 72, 'good'),         -- Monkey health
(4, 72, 'adult'),        -- Monkey age
(5, 72, 'Aggressive level 2'), -- Interaction
(6, 72, 0);        -- Visible Food

-- For observation 73
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 73, 'Female'),       -- Monkey gender
(2, 73, '2'),            -- Monkey group
(3, 73, 'good'),         -- Monkey health
(4, 73, 'child'),        -- Monkey age
(5, 73, 'Aggressive level 1'), -- Interaction
(6, 73, 1);         -- Visible Food

-- For observation 74
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 74, 'Male'),         -- Monkey gender
(2, 74, '3'),            -- Monkey group
(3, 74, 'good'),         -- Monkey health
(4, 74, 'adult'),        -- Monkey age
(5, 74, 'Physical contact'), -- Interaction
(6, 74, 0);        -- Visible Food

-- For observation 75
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 75, 'Female'),       -- Monkey gender
(2, 75, '1'),            -- Monkey group
(3, 75, 'good'),         -- Monkey health
(4, 75, 'teenage'),      -- Monkey age
(5, 75, 'Aggressive level 2'), -- Interaction
(6, 75, 1);         -- Visible Food

-- For observation 76
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 76, 'Male'),         -- Monkey gender
(2, 76, '2'),            -- Monkey group
(3, 76, 'good'),         -- Monkey health
(4, 76, 'child'),        -- Monkey age
(5, 76, 'Aggressive level 3'), -- Interaction
(6, 76, 0);        -- Visible Food

-- For observation 77
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 77, 'Female'),       -- Monkey gender
(2, 77, '3'),            -- Monkey group
(3, 77, 'good'),         -- Monkey health
(4, 77, 'adult'),        -- Monkey age
(5, 77, 'Physical contact'), -- Interaction
(6, 77, 1);         -- Visible Food

-- For observation 78
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 78, 'Male'),         -- Monkey gender
(2, 78, '1'),            -- Monkey group
(3, 78, 'good'),         -- Monkey health
(4, 78, 'teenage'),      -- Monkey age
(5, 78, 'Aggressive level 1'), -- Interaction
(6, 78, 0);        -- Visible Food

-- For observation 79
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 79, 'Female'),       -- Monkey gender
(2, 79, '2'),            -- Monkey group
(3, 79, 'good'),         -- Monkey health
(4, 79, 'child'),        -- Monkey age
(5, 79, 'Aggressive level 3'), -- Interaction
(6, 79, 1);         -- Visible Food

-- For observation 80
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 80, 'Male'),         -- Monkey gender
(2, 80, '3'),            -- Monkey group
(3, 80, 'good'),         -- Monkey health
(4, 80, 'adult'),        -- Monkey age
(5, 80, 'Aggressive level 2'), -- Interaction
(6, 80, 0);        -- Visible Food

-- For observation 81
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 81, 'Female'),       -- Monkey gender
(2, 81, '1'),            -- Monkey group
(3, 81, 'good'),         -- Monkey health
(4, 81, 'teenage'),      -- Monkey age
(5, 81, 'Physical contact'), -- Interaction
(6, 81, 1);         -- Visible Food

-- For observation 82
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 82, 'Male'),         -- Monkey gender
(2, 82, '2'),            -- Monkey group
(3, 82, 'good'),         -- Monkey health
(4, 82, 'child'),        -- Monkey age
(5, 82, 'Aggressive level 1'), -- Interaction
(6, 82, 0);        -- Visible Food

-- For observation 83
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 83, 'Female'),       -- Monkey gender
(2, 83, '3'),            -- Monkey group
(3, 83, 'good'),         -- Monkey health
(4, 83, 'adult'),        -- Monkey age
(5, 83, 'Aggressive level 2'), -- Interaction
(6, 83, 1);         -- Visible Food

-- For observation 84
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 84, 'Male'),         -- Monkey gender
(2, 84, '1'),            -- Monkey group
(3, 84, 'good'),         -- Monkey health
(4, 84, 'teenage'),      -- Monkey age
(5, 84, 'Aggressive level 3'), -- Interaction
(6, 84, 0);        -- Visible Food

-- For observation 85
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 85, 'Female'),       -- Monkey gender
(2, 85, '2'),            -- Monkey group
(3, 85, 'good'),         -- Monkey health
(4, 85, 'child'),        -- Monkey age
(5, 85, 'Physical contact'), -- Interaction
(6, 85, 1);         -- Visible Food

-- For observation 86
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 86, 'Male'),         -- Monkey gender
(2, 86, '3'),            -- Monkey group
(3, 86, 'good'),         -- Monkey health
(4, 86, 'adult'),        -- Monkey age
(5, 86, 'Aggressive level 1'), -- Interaction
(6, 86, 0);        -- Visible Food

-- For observation 87
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 87, 'Female'),       -- Monkey gender
(2, 87, '1'),            -- Monkey group
(3, 87, 'good'),         -- Monkey health
(4, 87, 'teenage'),      -- Monkey age
(5, 87, 'Aggressive level 2'), -- Interaction
(6, 87, 1);         -- Visible Food

-- For observation 88
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 88, 'Male'),         -- Monkey gender
(2, 88, '2'),            -- Monkey group
(3, 88, 'good'),         -- Monkey health
(4, 88, 'child'),        -- Monkey age
(5, 88, 'Aggressive level 3'), -- Interaction
(6, 88, 0);        -- Visible Food

-- For observation 89
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 89, 'Female'),       -- Monkey gender
(2, 89, '3'),            -- Monkey group
(3, 89, 'good'),         -- Monkey health
(4, 89, 'adult'),        -- Monkey age
(5, 89, 'Physical contact'), -- Interaction
(6, 89, 1);         -- Visible Food

-- For observation 90
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 90, 'Male'),         -- Monkey gender
(2, 90, '1'),            -- Monkey group
(3, 90, 'good'),         -- Monkey health
(4, 90, 'teenage'),      -- Monkey age
(5, 90, 'Aggressive level 1'), -- Interaction
(6, 90, 0);        -- Visible Food

-- For observation 91
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 91, 'Female'),       -- Monkey gender
(2, 91, '2'),            -- Monkey group
(3, 91, 'good'),         -- Monkey health
(4, 91, 'child'),        -- Monkey age
(5, 91, 'Aggressive level 2'), -- Interaction
(6, 91, 1);         -- Visible Food

-- For observation 92
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 92, 'Male'),         -- Monkey gender
(2, 92, '3'),            -- Monkey group
(3, 92, 'good'),         -- Monkey health
(4, 92, 'adult'),        -- Monkey age
(5, 92, 'Aggressive level 3'), -- Interaction
(6, 92, 0);        -- Visible Food

-- For observation 93
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 93, 'Female'),       -- Monkey gender
(2, 93, '1'),            -- Monkey group
(3, 93, 'good'),         -- Monkey health
(4, 93, 'teenage'),      -- Monkey age
(5, 93, 'Physical contact'), -- Interaction
(6, 93, 1);         -- Visible Food	

-- For observation 93
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 93, 'Female'),       -- Monkey gender
(2, 93, '1'),            -- Monkey group
(3, 93, 'good'),         -- Monkey health
(4, 93, 'teenage'),      -- Monkey age
(5, 93, 'Aggressive level 1'), -- Interaction
(6, 93, 1);         -- Visible Food

-- For observation 94
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 94, 'Male'),         -- Monkey gender
(2, 94, '2'),            -- Monkey group
(3, 94, 'good'),         -- Monkey health
(4, 94, 'child'),        -- Monkey age
(5, 94, 'Aggressive level 3'), -- Interaction
(6, 94, 0);        -- Visible Food

-- For observation 95
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 95, 'Female'),       -- Monkey gender
(2, 95, '3'),            -- Monkey group
(3, 95, 'good'),         -- Monkey health
(4, 95, 'adult'),        -- Monkey age
(5, 95, 'Physical contact'), -- Interaction
(6, 95, 1);         -- Visible Food

-- For observation 96
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 96, 'Male'),         -- Monkey gender
(2, 96, '1'),            -- Monkey group
(3, 96, 'good'),         -- Monkey health
(4, 96, 'teenage'),      -- Monkey age
(5, 96, 'Aggressive level 2'), -- Interaction
(6, 96, 0);        -- Visible Food

-- For observation 97
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 97, 'Female'),       -- Monkey gender
(2, 97, '2'),            -- Monkey group
(3, 97, 'good'),         -- Monkey health
(4, 97, 'child'),        -- Monkey age
(5, 97, 'Aggressive level 1'), -- Interaction
(6, 97, 1);         -- Visible Food

-- For observation 98
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 98, 'Male'),         -- Monkey gender
(2, 98, '3'),            -- Monkey group
(3, 98, 'good'),         -- Monkey health
(4, 98, 'adult'),        -- Monkey age
(5, 98, 'Aggressive level 3'), -- Interaction
(6, 98, 0);        -- Visible Food

-- For observation 99
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 99, 'Female'),       -- Monkey gender
(2, 99, '1'),            -- Monkey group
(3, 99, 'good'),         -- Monkey health
(4, 99, 'teenage'),      -- Monkey age
(5, 99, 'Physical contact'), -- Interaction
(6, 99, 1);         -- Visible Food

-- For observation 100
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 100, 'Male'),        -- Monkey gender
(2, 100, '2'),           -- Monkey group
(3, 100, 'good'),        -- Monkey health
(4, 100, 'child'),       -- Monkey age
(5, 100, 'Aggressive level 2'), -- Interaction
(6, 100, 0);       -- Visible Food

-- For observation 101
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 101, 'Female'),       -- Monkey gender
(2, 101, '1'),            -- Monkey group
(3, 101, 'good'),         -- Monkey health
(4, 101, 'teenage'),      -- Monkey age
(5, 101, 'Aggressive level 1'), -- Interaction
(6, 101, 1);         -- Visible Food

-- For observation 102
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 102, 'Male'),         -- Monkey gender
(2, 102, '2'),            -- Monkey group
(3, 102, 'good'),         -- Monkey health
(4, 102, 'child'),        -- Monkey age
(5, 102, 'Aggressive level 2'), -- Interaction
(6, 102, 0);        -- Visible Food

-- For observation 103
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 103, 'Female'),       -- Monkey gender
(2, 103, '3'),            -- Monkey group
(3, 103, 'good'),         -- Monkey health
(4, 103, 'adult'),        -- Monkey age
(5, 103, 'Physical contact'), -- Interaction
(6, 103, 1);         -- Visible Food

-- For observation 104
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 104, 'Male'),         -- Monkey gender
(2, 104, '1'),            -- Monkey group
(3, 104, 'good'),         -- Monkey health
(4, 104, 'teenage'),      -- Monkey age
(5, 104, 'Aggressive level 3'), -- Interaction
(6, 104, 0);        -- Visible Food

-- For observation 105
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 105, 'Female'),       -- Monkey gender
(2, 105, '2'),            -- Monkey group
(3, 105, 'good'),         -- Monkey health
(4, 105, 'child'),        -- Monkey age
(5, 105, 'Aggressive level 1'), -- Interaction
(6, 105, 1);         -- Visible Food

-- For observation 106
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 106, 'Male'),         -- Monkey gender
(2, 106, '3'),            -- Monkey group
(3, 106, 'good'),         -- Monkey health
(4, 106, 'adult'),        -- Monkey age
(5, 106, 'Aggressive level 2'), -- Interaction
(6, 106, 0);        -- Visible Food

-- For observation 107
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 107, 'Female'),       -- Monkey gender
(2, 107, '1'),            -- Monkey group
(3, 107, 'good'),         -- Monkey health
(4, 107, 'teenage'),      -- Monkey age
(5, 107, 'Physical contact'), -- Interaction
(6, 107, 1);         -- Visible Food

-- For observation 108
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 108, 'Male'),         -- Monkey gender
(2, 108, '2'),            -- Monkey group
(3, 108, 'good'),         -- Monkey health
(4, 108, 'child'),        -- Monkey age
(5, 108, 'Aggressive level 3'), -- Interaction
(6, 108, 0);        -- Visible Food

-- For observation 109
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 109, 'Female'),       -- Monkey gender
(2, 109, '3'),            -- Monkey group
(3, 109, 'good'),         -- Monkey health
(4, 109, 'adult'),        -- Monkey age
(5, 109, 'Aggressive level 1'), -- Interaction
(6, 109, 1);         -- Visible Food

-- For observation 110
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 110, 'Male'),         -- Monkey gender
(2, 110, '1'),            -- Monkey group
(3, 110, 'good'),         -- Monkey health
(4, 110, 'teenage'),      -- Monkey age
(5, 110, 'Aggressive level 2'), -- Interaction
(6, 110, 0);        -- Visible Food

-- For observation 111
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 111, 'Female'),       -- Monkey gender
(2, 111, '2'),            -- Monkey group
(3, 111, 'good'),         -- Monkey health
(4, 111, 'adult'),        -- Monkey age
(5, 111, 'Physical contact'), -- Interaction
(6, 111, 0);        -- Visible Food

-- For observation 112
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 112, 'Male'),         -- Monkey gender
(2, 112, '1'),            -- Monkey group
(3, 112, 'good'),         -- Monkey health
(4, 112, 'teenage'),      -- Monkey age
(5, 112, 'Aggressive level 1'), -- Interaction
(6, 112, 1);         -- Visible Food

-- For observation 113
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 113, 'Female'),       -- Monkey gender
(2, 113, '3'),            -- Monkey group
(3, 113, 'good'),         -- Monkey health
(4, 113, 'child'),        -- Monkey age
(5, 113, 'Aggressive level 2'), -- Interaction
(6, 113, 0);        -- Visible Food

-- For observation 114
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 114, 'Male'),         -- Monkey gender
(2, 114, '2'),            -- Monkey group
(3, 114, 'good'),         -- Monkey health
(4, 114, 'adult'),        -- Monkey age
(5, 114, 'Aggressive level 3'), -- Interaction
(6, 114, 1);         -- Visible Food

-- For observation 115
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 115, 'Female'),       -- Monkey gender
(2, 115, '1'),            -- Monkey group
(3, 115, 'good'),         -- Monkey health
(4, 115, 'teenage'),      -- Monkey age
(5, 115, 'Physical contact'), -- Interaction
(6, 115, 0);        -- Visible Food

-- For observation 116
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 116, 'Male'),         -- Monkey gender
(2, 116, '3'),            -- Monkey group
(3, 116, 'good'),         -- Monkey health
(4, 116, 'child'),        -- Monkey age
(5, 116, 'Aggressive level 1'), -- Interaction
(6, 116, 1);         -- Visible Food

-- For observation 117
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 117, 'Female'),       -- Monkey gender
(2, 117, '2'),            -- Monkey group
(3, 117, 'good'),         -- Monkey health
(4, 117, 'adult'),        -- Monkey age
(5, 117, 'Aggressive level 2'), -- Interaction
(6, 117, 0);        -- Visible Food

-- For observation 118
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 118, 'Male'),         -- Monkey gender
(2, 118, '1'),            -- Monkey group
(3, 118, 'good'),         -- Monkey health
(4, 118, 'teenage'),      -- Monkey age
(5, 118, 'Aggressive level 3'), -- Interaction
(6, 118, 1);         -- Visible Food

-- For observation 119
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 119, 'Female'),       -- Monkey gender
(2, 119, '3'),            -- Monkey group
(3, 119, 'good'),         -- Monkey health
(4, 119, 'child'),        -- Monkey age
(5, 119, 'Physical contact'), -- Interaction
(6, 119, 0);        -- Visible Food

-- For observation 120
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 120, 'Male'),         -- Monkey gender
(2, 120, '2'),            -- Monkey group
(3, 120, 'good'),         -- Monkey health
(4, 120, 'adult'),        -- Monkey age
(5, 120, 'Aggressive level 1'), -- Interaction
(6, 120, 1);         -- Visible Food

-- For observation 121
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 121, 'Female'),       -- Monkey gender
(2, 121, '1'),            -- Monkey group
(3, 121, 'good'),         -- Monkey health
(4, 121, 'teenage'),      -- Monkey age
(5, 121, 'Aggressive level 3'), -- Interaction
(6, 121, 1);         -- Visible Food

-- For observation 122
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 122, 'Male'),         -- Monkey gender
(2, 122, '3'),            -- Monkey group
(3, 122, 'injured'),      -- Monkey health
(4, 122, 'adult'),        -- Monkey age
(5, 122, 'Physical contact'), -- Interaction
(6, 122, 0);        -- Visible Food

-- For observation 123
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 123, 'Female'),       -- Monkey gender
(2, 123, '2'),            -- Monkey group
(3, 123, 'good'),         -- Monkey health
(4, 123, 'child'),        -- Monkey age
(5, 123, 'Aggressive level 1'), -- Interaction
(6, 123, 1);         -- Visible Food

-- For observation 124
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 124, 'Male'),         -- Monkey gender
(2, 124, '1'),            -- Monkey group
(3, 124, 'sick'),         -- Monkey health
(4, 124, 'teenage'),      -- Monkey age
(5, 124, 'Aggressive level 2'), -- Interaction
(6, 124, 0);        -- Visible Food

-- For observation 125
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 125, 'Female'),       -- Monkey gender
(2, 125, '3'),            -- Monkey group
(3, 125, 'good'),         -- Monkey health
(4, 125, 'adult'),        -- Monkey age
(5, 125, 'Physical contact'), -- Interaction
(6, 125, 1);         -- Visible Food

-- For observation 126
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 126, 'Male'),         -- Monkey gender
(2, 126, '2'),            -- Monkey group
(3, 126, 'good'),         -- Monkey health
(4, 126, 'child'),        -- Monkey age
(5, 126, 'Aggressive level 3'), -- Interaction
(6, 126, 0);        -- Visible Food

-- For observation 127
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 127, 'Female'),       -- Monkey gender
(2, 127, '1'),            -- Monkey group
(3, 127, 'injured'),      -- Monkey health
(4, 127, 'teenage'),      -- Monkey age
(5, 127, 'Aggressive level 2'), -- Interaction
(6, 127, 1);         -- Visible Food

-- For observation 128
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 128, 'Male'),         -- Monkey gender
(2, 128, '3'),            -- Monkey group
(3, 128, 'good'),         -- Monkey health
(4, 128, 'adult'),        -- Monkey age
(5, 128, 'Physical contact'), -- Interaction
(6, 128, 0);        -- Visible Food

-- For observation 129
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 129, 'Female'),       -- Monkey gender
(2, 129, '2'),            -- Monkey group
(3, 129, 'good'),         -- Monkey health
(4, 129, 'child'),        -- Monkey age
(5, 129, 'Aggressive level 1'), -- Interaction
(6, 129, 1);         -- Visible Food

-- For observation 130
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 130, 'Male'),         -- Monkey gender
(2, 130, '1'),            -- Monkey group
(3, 130, 'good'),         -- Monkey health
(4, 130, 'teenage'),      -- Monkey age
(5, 130, 'Aggressive level 3'), -- Interaction
(6, 130, 0);        -- Visible Food

-- For observation 131
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 131, 'Female'),       -- Monkey gender
(2, 131, '3'),            -- Monkey group
(3, 131, 'good'),         -- Monkey health
(4, 131, 'adult'),        -- Monkey age
(5, 131, 'Physical contact'), -- Interaction
(6, 131, 1);         -- Visible Food

-- For observation 132
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 132, 'Male'),         -- Monkey gender
(2, 132, '2'),            -- Monkey group
(3, 132, 'sick'),         -- Monkey health
(4, 132, 'teenage'),      -- Monkey age
(5, 132, 'Aggressive level 2'), -- Interaction
(6, 132, 0);        -- Visible Food

-- For observation 133
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 133, 'Female'),       -- Monkey gender
(2, 133, '1'),            -- Monkey group
(3, 133, 'good'),         -- Monkey health
(4, 133, 'child'),        -- Monkey age
(5, 133, 'Aggressive level 1'), -- Interaction
(6, 133, 1);         -- Visible Food

-- For observation 134
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 134, 'Male'),         -- Monkey gender
(2, 134, '3'),            -- Monkey group
(3, 134, 'good'),         -- Monkey health
(4, 134, 'adult'),        -- Monkey age
(5, 134, 'Aggressive level 3'), -- Interaction
(6, 134, 0);        -- Visible Food

-- For observation 135
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 135, 'Female'),       -- Monkey gender
(2, 135, '2'),            -- Monkey group
(3, 135, 'injured'),      -- Monkey health
(4, 135, 'teenage'),      -- Monkey age
(5, 135, 'Aggressive level 2'), -- Interaction
(6, 135, 1);         -- Visible Food

-- For observation 136
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 136, 'Male'),         -- Monkey gender
(2, 136, '1'),            -- Monkey group
(3, 136, 'good'),         -- Monkey health
(4, 136, 'child'),        -- Monkey age
(5, 136, 'Physical contact'), -- Interaction
(6, 136, 0);        -- Visible Food

-- For observation 137
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 137, 'Female'),       -- Monkey gender
(2, 137, '3'),            -- Monkey group
(3, 137, 'good'),         -- Monkey health
(4, 137, 'adult'),        -- Monkey age
(5, 137, 'Aggressive level 1'), -- Interaction
(6, 137, 1);         -- Visible Food

-- For observation 138
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 138, 'Male'),         -- Monkey gender
(2, 138, '2'),            -- Monkey group
(3, 138, 'good'),         -- Monkey health
(4, 138, 'teenage'),      -- Monkey age
(5, 138, 'Aggressive level 3'), -- Interaction
(6, 138, 0);        -- Visible Food

-- For observation 139
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 139, 'Female'),       -- Monkey gender
(2, 139, '1'),            -- Monkey group
(3, 139, 'good'),         -- Monkey health
(4, 139, 'child'),        -- Monkey age
(5, 139, 'Physical contact'), -- Interaction
(6, 139, 1);         -- Visible Food

-- For observation 140
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 140, 'Male'),         -- Monkey gender
(2, 140, '3'),            -- Monkey group
(3, 140, 'good'),         -- Monkey health
(4, 140, 'adult'),        -- Monkey age
(5, 140, 'Aggressive level 2'), -- Interaction
(6, 140, 0);        -- Visible Food

-- For observation 141
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 141, 'Female'),       -- Monkey gender
(2, 141, '2'),            -- Monkey group
(3, 141, 'good'),         -- Monkey health
(4, 141, 'teenage'),      -- Monkey age
(5, 141, 'Aggressive level 3'), -- Interaction
(6, 141, 1);         -- Visible Food

-- For observation 142
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 142, 'Male'),         -- Monkey gender
(2, 142, '1'),            -- Monkey group
(3, 142, 'good'),         -- Monkey health
(4, 142, 'child'),        -- Monkey age
(5, 142, 'Aggressive level 2'), -- Interaction
(6, 142, 0);        -- Visible Food

-- For observation 143
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 143, 'Female'),       -- Monkey gender
(2, 143, '3'),            -- Monkey group
(3, 143, 'injured'),      -- Monkey health
(4, 143, 'adult'),        -- Monkey age
(5, 143, 'Aggressive level 1'), -- Interaction
(6, 143, 1);         -- Visible Food

-- For observation 144
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 144, 'Male'),         -- Monkey gender
(2, 144, '2'),            -- Monkey group
(3, 144, 'good'),         -- Monkey health
(4, 144, 'teenage'),      -- Monkey age
(5, 144, 'Physical contact'), -- Interaction
(6, 144, 0);        -- Visible Food

-- For observation 145
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 145, 'Female'),       -- Monkey gender
(2, 145, '1'),            -- Monkey group
(3, 145, 'good'),         -- Monkey health
(4, 145, 'child'),        -- Monkey age
(5, 145, 'Aggressive level 3'), -- Interaction
(6, 145, 1);         -- Visible Food

-- For observation 146
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 146, 'Male'),         -- Monkey gender
(2, 146, '3'),            -- Monkey group
(3, 146, 'good'),         -- Monkey health
(4, 146, 'adult'),        -- Monkey age
(5, 146, 'Aggressive level 2'), -- Interaction
(6, 146, 0);        -- Visible Food

-- For observation 147
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 147, 'Female'),       -- Monkey gender
(2, 147, '2'),            -- Monkey group
(3, 147, 'sick'),         -- Monkey health
(4, 147, 'teenage'),      -- Monkey age
(5, 147, 'Aggressive level 1'), -- Interaction
(6, 147, 1);         -- Visible Food

-- For observation 148
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 148, 'Male'),         -- Monkey gender
(2, 148, '1'),            -- Monkey group
(3, 148, 'good'),         -- Monkey health
(4, 148, 'child'),        -- Monkey age
(5, 148, 'Physical contact'), -- Interaction
(6, 148, 0);        -- Visible Food

-- For observation 149
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 149, 'Female'),       -- Monkey gender
(2, 149, '3'),            -- Monkey group
(3, 149, 'good'),         -- Monkey health
(4, 149, 'adult'),        -- Monkey age
(5, 149, 'Aggressive level 3'), -- Interaction
(6, 149, 1);         -- Visible Food

-- For observation 150
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 150, 'Male'),         -- Monkey gender
(2, 150, '2'),            -- Monkey group
(3, 150, 'good'),         -- Monkey health
(4, 150, 'teenage'),      -- Monkey age
(5, 150, 'Aggressive level 2'), -- Interaction
(6, 150, 0);        -- Visible Food

-- For observation 151
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 151, 'Female'),       -- Monkey gender
(2, 151, '1'),            -- Monkey group
(3, 151, 'good'),         -- Monkey health
(4, 151, 'adult'),        -- Monkey age
(5, 151, 'Aggressive level 1'), -- Interaction
(6, 151, 1);         -- Visible Food

-- For observation 152
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 152, 'Male'),         -- Monkey gender
(2, 152, '2'),            -- Monkey group
(3, 152, 'injured'),      -- Monkey health
(4, 152, 'teenage'),      -- Monkey age
(5, 152, 'Physical contact'), -- Interaction
(6, 152, 0);        -- Visible Food

-- For observation 153
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 153, 'Female'),       -- Monkey gender
(2, 153, '3'),            -- Monkey group
(3, 153, 'good'),         -- Monkey health
(4, 153, 'child'),        -- Monkey age
(5, 153, 'Aggressive level 2'), -- Interaction
(6, 153, 1);         -- Visible Food

-- For observation 154
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 154, 'Male'),         -- Monkey gender
(2, 154, '1'),            -- Monkey group
(3, 154, 'sick'),         -- Monkey health
(4, 154, 'adult'),        -- Monkey age
(5, 154, 'Aggressive level 3'), -- Interaction
(6, 154, 0);        -- Visible Food

-- For observation 155
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 155, 'Female'),       -- Monkey gender
(2, 155, '2'),            -- Monkey group
(3, 155, 'good'),         -- Monkey health
(4, 155, 'teenage'),      -- Monkey age
(5, 155, 'Aggressive level 1'), -- Interaction
(6, 155, 1);         -- Visible Food

-- For observation 156
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 156, 'Male'),         -- Monkey gender
(2, 156, '3'),            -- Monkey group
(3, 156, 'good'),         -- Monkey health
(4, 156, 'child'),        -- Monkey age
(5, 156, 'Physical contact'), -- Interaction
(6, 156, 0);        -- Visible Food

-- For observation 157
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 157, 'Female'),       -- Monkey gender
(2, 157, '1'),            -- Monkey group
(3, 157, 'good'),         -- Monkey health
(4, 157, 'adult'),        -- Monkey age
(5, 157, 'Aggressive level 3'), -- Interaction
(6, 157, 1);         -- Visible Food

-- For observation 158
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 158, 'Male'),         -- Monkey gender
(2, 158, '2'),            -- Monkey group
(3, 158, 'injured'),      -- Monkey health
(4, 158, 'teenage'),      -- Monkey age
(5, 158, 'Aggressive level 2'), -- Interaction
(6, 158, 0);        -- Visible Food

-- For observation 159
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 159, 'Female'),       -- Monkey gender
(2, 159, '3'),            -- Monkey group
(3, 159, 'good'),         -- Monkey health
(4, 159, 'child'),        -- Monkey age
(5, 159, 'Aggressive level 1'), -- Interaction
(6, 159, 1);         -- Visible Food

-- For observation 160
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 160, 'Male'),         -- Monkey gender
(2, 160, '1'),            -- Monkey group
(3, 160, 'good'),         -- Monkey health
(4, 160, 'adult'),        -- Monkey age
(5, 160, 'Physical contact'), -- Interaction
(6, 160, 0);        -- Visible Food

-- For observation 161
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 161, 'Female'),       -- Monkey gender
(2, 161, '2'),            -- Monkey group
(3, 161, 'good'),         -- Monkey health
(4, 161, 'teenage'),      -- Monkey age
(5, 161, 'Aggressive level 2'), -- Interaction
(6, 161, 1);         -- Visible Food

-- For observation 162
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 162, 'Male'),         -- Monkey gender
(2, 162, '3'),            -- Monkey group
(3, 162, 'good'),         -- Monkey health
(4, 162, 'child'),        -- Monkey age
(5, 162, 'Physical contact'), -- Interaction
(6, 162, 0);        -- Visible Food

-- For observation 163
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 163, 'Female'),       -- Monkey gender
(2, 163, '1'),            -- Monkey group
(3, 163, 'good'),         -- Monkey health
(4, 163, 'adult'),        -- Monkey age
(5, 163, 'Aggressive level 1'), -- Interaction
(6, 163, 1);         -- Visible Food

-- For observation 164
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 164, 'Male'),         -- Monkey gender
(2, 164, '2'),            -- Monkey group
(3, 164, 'sick'),         -- Monkey health
(4, 164, 'teenage'),      -- Monkey age
(5, 164, 'Aggressive level 3'), -- Interaction
(6, 164, 0);        -- Visible Food

-- For observation 165
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 165, 'Female'),       -- Monkey gender
(2, 165, '3'),            -- Monkey group
(3, 165, 'good'),         -- Monkey health
(4, 165, 'child'),        -- Monkey age
(5, 165, 'Aggressive level 2'), -- Interaction
(6, 165, 1);         -- Visible Food

-- For observation 166
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 166, 'Male'),         -- Monkey gender
(2, 166, '1'),            -- Monkey group
(3, 166, 'good'),         -- Monkey health
(4, 166, 'adult'),        -- Monkey age
(5, 166, 'Physical contact'), -- Interaction
(6, 166, 0);        -- Visible Food

-- For observation 167
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 167, 'Female'),       -- Monkey gender
(2, 167, '2'),            -- Monkey group
(3, 167, 'good'),         -- Monkey health
(4, 167, 'teenage'),      -- Monkey age
(5, 167, 'Aggressive level 1'), -- Interaction
(6, 167, 1);         -- Visible Food

-- For observation 168
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 168, 'Male'),         -- Monkey gender
(2, 168, '3'),            -- Monkey group
(3, 168, 'good'),         -- Monkey health
(4, 168, 'child'),        -- Monkey age
(5, 168, 'Aggressive level 2'), -- Interaction
(6, 168, 0);        -- Visible Food

-- For observation 169
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 169, 'Female'),       -- Monkey gender
(2, 169, '1'),            -- Monkey group
(3, 169, 'good'),         -- Monkey health
(4, 169, 'adult'),        -- Monkey age
(5, 169, 'Physical contact'), -- Interaction
(6, 169, 1);         -- Visible Food

-- For observation 170
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 170, 'Male'),         -- Monkey gender
(2, 170, '2'),            -- Monkey group
(3, 170, 'injured'),      -- Monkey health
(4, 170, 'teenage'),      -- Monkey age
(5, 170, 'Aggressive level 3'), -- Interaction
(6, 170, 0);        -- Visible Food

-- For observation 171
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 171, 'Female'),
(2, 171, '3'),
(3, 171, 'good'),
(4, 171, 'adult'),
(5, 171, 'Aggressive level 1'),
(6, 171, 1);

-- For observation 172
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 172, 'Male'),
(2, 172, '1'),
(3, 172, 'good'),
(4, 172, 'teenage'),
(5, 172, 'Aggressive level 2'),
(6, 172, 0);

-- For observation 173
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 173, 'Female'),
(2, 173, '2'),
(3, 173, 'good'),
(4, 173, 'child'),
(5, 173, 'Physical contact'),
(6, 173, 1);

-- For observation 174
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 174, 'Male'),
(2, 174, '3'),
(3, 174, 'good'),
(4, 174, 'adult'),
(5, 174, 'Aggressive level 3'),
(6, 174, 0);

-- For observation 175
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 175, 'Female'),
(2, 175, '1'),
(3, 175, 'good'),
(4, 175, 'teenage'),
(5, 175, 'Aggressive level 1'),
(6, 175, 1);

-- For observation 176
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 176, 'Male'),
(2, 176, '2'),
(3, 176, 'good'),
(4, 176, 'child'),
(5, 176, 'Aggressive level 2'),
(6, 176, 0);

-- For observation 177
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 177, 'Female'),
(2, 177, '3'),
(3, 177, 'good'),
(4, 177, 'adult'),
(5, 177, 'Physical contact'),
(6, 177, 1);

-- For observation 178
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 178, 'Male'),
(2, 178, '1'),
(3, 178, 'sick'),
(4, 178, 'teenage'),
(5, 178, 'Aggressive level 3'),
(6, 178, 0);

-- For observation 179
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 179, 'Female'),
(2, 179, '2'),
(3, 179, 'good'),
(4, 179, 'child'),
(5, 179, 'Aggressive level 1'),
(6, 179, 1);

-- For observation 180
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 180, 'Male'),
(2, 180, '3'),
(3, 180, 'good'),
(4, 180, 'adult'),
(5, 180, 'Aggressive level 2'),
(6, 180, 0);

-- For observation 181
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 181, 'Female'),
(2, 181, '1'),
(3, 181, 'good'),
(4, 181, 'teenage'),
(5, 181, 'Aggressive level 3'),
(6, 181, 1);

-- For observation 182
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 182, 'Male'),
(2, 182, '2'),
(3, 182, 'good'),
(4, 182, 'child'),
(5, 182, 'Physical contact'),
(6, 182, 0);

-- For observation 183
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 183, 'Female'),
(2, 183, '3'),
(3, 183, 'good'),
(4, 183, 'adult'),
(5, 183, 'Aggressive level 1'),
(6, 183, 1);

-- For observation 184
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 184, 'Male'),
(2, 184, '1'),
(3, 184, 'injured'),
(4, 184, 'teenage'),
(5, 184, 'Aggressive level 2'),
(6, 184, 0);

-- For observation 185
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 185, 'Female'),
(2, 185, '2'),
(3, 185, 'good'),
(4, 185, 'child'),
(5, 185, 'Aggressive level 3'),
(6, 185, 1);

-- For observation 186
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 186, 'Male'),
(2, 186, '3'),
(3, 186, 'good'),
(4, 186, 'adult'),
(5, 186, 'Physical contact'),
(6, 186, 0);

-- For observation 187
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 187, 'Female'),
(2, 187, '1'),
(3, 187, 'good'),
(4, 187, 'teenage'),
(5, 187, 'Aggressive level 1'),
(6, 187, 1);

-- For observation 188
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 188, 'Male'),
(2, 188, '2'),
(3, 188, 'good'),
(4, 188, 'child'),
(5, 188, 'Aggressive level 2'),
(6, 188, 0);

-- For observation 189
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 189, 'Female'),
(2, 189, '3'),
(3, 189, 'good'),
(4, 189, 'adult'),
(5, 189, 'Aggressive level 3'),
(6, 189, 1);

-- For observation 190
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 190, 'Male'),
(2, 190, '1'),
(3, 190, 'sick'),
(4, 190, 'teenage'),
(5, 190, 'Physical contact'),
(6, 190, 0);

-- For observation 191
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 191, 'Female'),
(2, 191, '2'),
(3, 191, 'good'),
(4, 191, 'child'),
(5, 191, 'Aggressive level 1'),
(6, 191, 1);

-- For observation 192
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 192, 'Male'),
(2, 192, '3'),
(3, 192, 'good'),
(4, 192, 'adult'),
(5, 192, 'Aggressive level 2'),
(6, 192, 0);

-- For observation 193
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 193, 'Female'),
(2, 193, '1'),
(3, 193, 'good'),
(4, 193, 'teenage'),
(5, 193, 'Aggressive level 3'),
(6, 193, 1);

-- For observation 194
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 194, 'Male'),
(2, 194, '2'),
(3, 194, 'good'),
(4, 194, 'child'),
(5, 194, 'Physical contact'),
(6, 194, 0);

-- For observation 195
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 195, 'Female'),
(2, 195, '3'),
(3, 195, 'good'),
(4, 195, 'adult'),
(5, 195, 'Aggressive level 1'),
(6, 195, 1);

-- For observation 196
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 196, 'Male'),
(2, 196, '1'),
(3, 196, 'injured'),
(4, 196, 'teenage'),
(5, 196, 'Aggressive level 2'),
(6, 196, 0);

-- For observation 197
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 197, 'Female'),
(2, 197, '2'),
(3, 197, 'good'),
(4, 197, 'child'),
(5, 197, 'Aggressive level 3'),
(6, 197, 1);

-- For observation 198
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 198, 'Male'),
(2, 198, '3'),
(3, 198, 'good'),
(4, 198, 'adult'),
(5, 198, 'Physical contact'),
(6, 198, 0);

-- For observation 199
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 199, 'Female'),
(2, 199, '1'),
(3, 199, 'good'),
(4, 199, 'teenage'),
(5, 199, 'Aggressive level 1'),
(6, 199, 1);

-- For observation 200
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 200, 'Male'),
(2, 200, '2'),
(3, 200, 'good'),
(4, 200, 'child'),
(5, 200, 'Aggressive level 2'),
(6, 200, 0);

-- For observation 221
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 221, 'Female'),
(2, 221, '2'),
(3, 221, 'good'),
(4, 221, 'child'),
(5, 221, 'Aggressive level 3'),
(6, 221, 'true');

-- For observation 222
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 222, 'Male'),
(2, 222, '3'),
(3, 222, 'good'),
(4, 222, 'adult'),
(5, 222, 'Physical contact'),
(6, 222, 'false');

-- For observation 223
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 223, 'Female'),
(2, 223, '1'),
(3, 223, 'good'),
(4, 223, 'teenage'),
(5, 223, 'Aggressive level 1'),
(6, 223, 'true');

-- For observation 224
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 224, 'Male'),
(2, 224, '2'),
(3, 224, 'good'),
(4, 224, 'child'),
(5, 224, 'Aggressive level 2'),
(6, 224, 'false');

-- For observation 225
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 225, 'Female'),
(2, 225, '3'),
(3, 225, 'good'),
(4, 225, 'adult'),
(5, 225, 'Aggressive level 3'),
(6, 225, 'true');

-- For observation 226
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 226, 'Male'),
(2, 226, '1'),
(3, 226, 'injured'),
(4, 226, 'teenage'),
(5, 226, 'Physical contact'),
(6, 226, 'false');

-- For observation 227
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 227, 'Female'),
(2, 227, '2'),
(3, 227, 'good'),
(4, 227, 'child'),
(5, 227, 'Aggressive level 1'),
(6, 227, 'true');

-- For observation 228
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 228, 'Male'),
(2, 228, '3'),
(3, 228, 'good'),
(4, 228, 'adult'),
(5, 228, 'Aggressive level 2'),
(6, 228, 'false');

-- For observation 229
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 229, 'Female'),
(2, 229, '1'),
(3, 229, 'good'),
(4, 229, 'teenage'),
(5, 229, 'Aggressive level 3'),
(6, 229, 'true');

-- For observation 230
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 230, 'Male'),
(2, 230, '2'),
(3, 230, 'good'),
(4, 230, 'child'),
(5, 230, 'Physical contact'),
(6, 230, 'false');

-- For observation 231
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 231, 'Female'),
(2, 231, '3'),
(3, 231, 'good'),
(4, 231, 'adult'),
(5, 231, 'Aggressive level 1'),
(6, 231, 'true');

-- For observation 232
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 232, 'Male'),
(2, 232, '1'),
(3, 232, 'good'),
(4, 232, 'teenage'),
(5, 232, 'Aggressive level 2'),
(6, 232, 'false');

-- For observation 233
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 233, 'Female'),
(2, 233, '2'),
(3, 233, 'good'),
(4, 233, 'child'),
(5, 233, 'Aggressive level 3'),
(6, 233, 'true');

-- For observation 234
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 234, 'Male'),
(2, 234, '3'),
(3, 234, 'good'),
(4, 234, 'adult'),
(5, 234, 'Physical contact'),
(6, 234, 'false');

-- For observation 235
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 235, 'Female'),
(2, 235, '1'),
(3, 235, 'good'),
(4, 235, 'teenage'),
(5, 235, 'Aggressive level 1'),
(6, 235, 'true');

-- For observation 236
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 236, 'Male'),
(2, 236, '2'),
(3, 236, 'good'),
(4, 236, 'child'),
(5, 236, 'Aggressive level 2'),
(6, 236, 'false');

-- For observation 237
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 237, 'Female'),
(2, 237, '3'),
(3, 237, 'good'),
(4, 237, 'adult'),
(5, 237, 'Aggressive level 3'),
(6, 237, 'true');

-- For observation 238
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 238, 'Male'),
(2, 238, '1'),
(3, 238, 'injured'),
(4, 238, 'teenage'),
(5, 238, 'Physical contact'),
(6, 238, 'false');

-- For observation 239
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 239, 'Female'),
(2, 239, '2'),
(3, 239, 'good'),
(4, 239, 'child'),
(5, 239, 'Aggressive level 1'),
(6, 239, 'true');

-- For observation 240
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 240, 'Male'),
(2, 240, '3'),
(3, 240, 'good'),
(4, 240, 'adult'),
(5, 240, 'Aggressive level 2'),
(6, 240, 'false');

-- For observation 241
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 241, 'Female'),
(2, 241, '1'),
(3, 241, 'good'),
(4, 241, 'teenage'),
(5, 241, 'Aggressive level 3'),
(6, 241, 'true');

-- For observation 242
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 242, 'Male'),
(2, 242, '2'),
(3, 242, 'good'),
(4, 242, 'child'),
(5, 242, 'Physical contact'),
(6, 242, 'false');

-- For observation 243
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 243, 'Female'),
(2, 243, '3'),
(3, 243, 'good'),
(4, 243, 'adult'),
(5, 243, 'Aggressive level 1'),
(6, 243, 'true');

-- For observation 244
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 244, 'Male'),
(2, 244, '1'),
(3, 244, 'injured'),
(4, 244, 'teenage'),
(5, 244, 'Aggressive level 2'),
(6, 244, 'false');

-- For observation 245
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 245, 'Female'),
(2, 245, '2'),
(3, 245, 'good'),
(4, 245, 'child'),
(5, 245, 'Aggressive level 3'),
(6, 245, 'true');

-- For observation 246
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 246, 'Male'),
(2, 246, '3'),
(3, 246, 'good'),
(4, 246, 'adult'),
(5, 246, 'Physical contact'),
(6, 246, 'false');

-- For observation 247
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 247, 'Female'),
(2, 247, '1'),
(3, 247, 'good'),
(4, 247, 'teenage'),
(5, 247, 'Aggressive level 1'),
(6, 247, 'true');

-- For observation 248
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 248, 'Male'),
(2, 248, '2'),
(3, 248, 'good'),
(4, 248, 'child'),
(5, 248, 'Aggressive level 2'),
(6, 248, 'false');

-- For observation 249
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 249, 'Female'),
(2, 249, '3'),
(3, 249, 'good'),
(4, 249, 'adult'),
(5, 249, 'Aggressive level 3'),
(6, 249, 'true');

-- For observation 250
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 250, 'Male'),
(2, 250, '1'),
(3, 250, 'injured'),
(4, 250, 'teenage'),
(5, 250, 'Physical contact'),
(6, 250, 'false');

-- For observation 251
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 251, 'Female'),
(2, 251, '2'),
(3, 251, 'good'),
(4, 251, 'child'),
(5, 251, 'Aggressive level 1'),
(6, 251, 'true');

-- For observation 252
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 252, 'Male'),
(2, 252, '3'),
(3, 252, 'good'),
(4, 252, 'adult'),
(5, 252, 'Aggressive level 2'),
(6, 252, 'false');

-- For observation 253
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 253, 'Female'),
(2, 253, '1'),
(3, 253, 'good'),
(4, 253, 'teenage'),
(5, 253, 'Aggressive level 3'),
(6, 253, 'true');

-- For observation 254
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 254, 'Male'),
(2, 254, '2'),
(3, 254, 'good'),
(4, 254, 'child'),
(5, 254, 'Physical contact'),
(6, 254, 'false');

-- For observation 255
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 255, 'Female'),
(2, 255, '3'),
(3, 255, 'good'),
(4, 255, 'adult'),
(5, 255, 'Aggressive level 1'),
(6, 255, 'true');

-- For observation 256
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 256, 'Male'),
(2, 256, '1'),
(3, 256, 'good'),
(4, 256, 'teenage'),
(5, 256, 'Aggressive level 2'),
(6, 256, 'true');

-- For observation 257
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 257, 'Female'),
(2, 257, '2'),
(3, 257, 'good'),
(4, 257, 'child'),
(5, 257, 'Aggressive level 3'),
(6, 257, 'false');

-- For observation 258
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 258, 'Male'),
(2, 258, '3'),
(3, 258, 'good'),
(4, 258, 'adult'),
(5, 258, 'Physical contact'),
(6, 258, 'true');

-- For observation 259
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 259, 'Female'),
(2, 259, '1'),
(3, 259, 'injured'),
(4, 259, 'teenage'),
(5, 259, 'Aggressive level 1'),
(6, 259, 'false');

-- For observation 260
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 260, 'Male'),
(2, 260, '2'),
(3, 260, 'good'),
(4, 260, 'child'),
(5, 260, 'Aggressive level 2'),
(6, 260, 'true');

-- For observation 261
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 261, 'Female'),
(2, 261, '3'),
(3, 261, 'good'),
(4, 261, 'adult'),
(5, 261, 'Aggressive level 3'),
(6, 261, 'false');

-- For observation 262
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 262, 'Male'),
(2, 262, '1'),
(3, 262, 'good'),
(4, 262, 'teenage'),
(5, 262, 'Physical contact'),
(6, 262, 'true');

-- For observation 263
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 263, 'Female'),
(2, 263, '2'),
(3, 263, 'good'),
(4, 263, 'child'),
(5, 263, 'Aggressive level 1'),
(6, 263, 'false');

-- For observation 264
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 264, 'Male'),
(2, 264, '3'),
(3, 264, 'good'),
(4, 264, 'adult'),
(5, 264, 'Aggressive level 2'),
(6, 264, 'true');

-- For observation 265
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 265, 'Female'),
(2, 265, '1'),
(3, 265, 'good'),
(4, 265, 'teenage'),
(5, 265, 'Aggressive level 3'),
(6, 265, 'false');

-- For observation 266
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 266, 'Male'),
(2, 266, '2'),
(3, 266, 'good'),
(4, 266, 'child'),
(5, 266, 'Physical contact'),
(6, 266, 'true');

-- For observation 267
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 267, 'Female'),
(2, 267, '3'),
(3, 267, 'good'),
(4, 267, 'adult'),
(5, 267, 'Aggressive level 1'),
(6, 267, 'false');

-- For observation 268
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 268, 'Male'),
(2, 268, '1'),
(3, 268, 'good'),
(4, 268, 'teenage'),
(5, 268, 'Aggressive level 2'),
(6, 268, 'true');

-- For observation 269
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 269, 'Female'),
(2, 269, '2'),
(3, 269, 'good'),
(4, 269, 'child'),
(5, 269, 'Aggressive level 3'),
(6, 269, 'false');

-- For observation 270
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 270, 'Male'),
(2, 270, '3'),
(3, 270, 'good'),
(4, 270, 'adult'),
(5, 270, 'Physical contact'),
(6, 270, 'true');

-- For observation 271
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 271, 'Female'),
(2, 271, '1'),
(3, 271, 'good'),
(4, 271, 'teenage'),
(5, 271, 'Aggressive level 1'),
(6, 271, 'false');

-- For observation 272
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 272, 'Male'),
(2, 272, '2'),
(3, 272, 'injured'),
(4, 272, 'child'),
(5, 272, 'Aggressive level 2'),
(6, 272, 'true');

-- For observation 273
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 273, 'Female'),
(2, 273, '3'),
(3, 273, 'good'),
(4, 273, 'adult'),
(5, 273, 'Aggressive level 3'),
(6, 273, 'false');

-- For observation 274
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 274, 'Male'),
(2, 274, '1'),
(3, 274, 'good'),
(4, 274, 'teenage'),
(5, 274, 'Physical contact'),
(6, 274, 'true');

-- For observation 275
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 275, 'Female'),
(2, 275, '2'),
(3, 275, 'sick'),
(4, 275, 'child'),
(5, 275, 'Aggressive level 1'),
(6, 275, 'false');

-- For observation 276
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 276, 'Male'),
(2, 276, '3'),
(3, 276, 'good'),
(4, 276, 'adult'),
(5, 276, 'Aggressive level 2'),
(6, 276, 'true');

-- For observation 277
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 277, 'Female'),
(2, 277, '1'),
(3, 277, 'good'),
(4, 277, 'teenage'),
(5, 277, 'Aggressive level 3'),
(6, 277, 'false');

-- For observation 278
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 278, 'Male'),
(2, 278, '2'),
(3, 278, 'good'),
(4, 278, 'child'),
(5, 278, 'Physical contact'),
(6, 278, 'true');

-- For observation 279
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 279, 'Female'),
(2, 279, '3'),
(3, 279, 'good'),
(4, 279, 'adult'),
(5, 279, 'Aggressive level 1'),
(6, 279, 'false');

-- For observation 280
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 280, 'Male'),
(2, 280, '1'),
(3, 280, 'good'),
(4, 280, 'teenage'),
(5, 280, 'Aggressive level 2'),
(6, 280, 'true');

-- For observation 281
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 281, 'Female'),
(2, 281, '2'),
(3, 281, 'good'),
(4, 281, 'child'),
(5, 281, 'Aggressive level 3'),
(6, 281, 'false');

-- For observation 282
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 282, 'Male'),
(2, 282, '3'),
(3, 282, 'good'),
(4, 282, 'adult'),
(5, 282, 'Physical contact'),
(6, 282, 'true');

-- For observation 283
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 283, 'Female'),
(2, 283, '1'),
(3, 283, 'good'),
(4, 283, 'teenage'),
(5, 283, 'Aggressive level 1'),
(6, 283, 'false');

-- For observation 284
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 284, 'Male'),
(2, 284, '2'),
(3, 284, 'good'),
(4, 284, 'child'),
(5, 284, 'Aggressive level 2'),
(6, 284, 'true');

-- For observation 285
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 285, 'Female'),
(2, 285, '3'),
(3, 285, 'good'),
(4, 285, 'adult'),
(5, 285, 'Aggressive level 3'),
(6, 285, 'false');

-- For observation 271
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 271, 'Female'),
(2, 271, '1'),
(3, 271, 'good'),
(4, 271, 'teenage'),
(5, 271, 'Aggressive level 1'),
(6, 271, 'false');

-- For observation 272
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 272, 'Male'),
(2, 272, '2'),
(3, 272, 'injured'),
(4, 272, 'child'),
(5, 272, 'Aggressive level 2'),
(6, 272, 'true');

-- For observation 273
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 273, 'Female'),
(2, 273, '3'),
(3, 273, 'good'),
(4, 273, 'adult'),
(5, 273, 'Aggressive level 3'),
(6, 273, 'false');

-- For observation 274
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 274, 'Male'),
(2, 274, '1'),
(3, 274, 'good'),
(4, 274, 'teenage'),
(5, 274, 'Physical contact'),
(6, 274, 'true');

-- For observation 275
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 275, 'Female'),
(2, 275, '2'),
(3, 275, 'sick'),
(4, 275, 'child'),
(5, 275, 'Aggressive level 1'),
(6, 275, 'false');

-- For observation 276
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 276, 'Male'),
(2, 276, '3'),
(3, 276, 'good'),
(4, 276, 'adult'),
(5, 276, 'Aggressive level 2'),
(6, 276, 'true');

-- For observation 277
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 277, 'Female'),
(2, 277, '1'),
(3, 277, 'good'),
(4, 277, 'teenage'),
(5, 277, 'Aggressive level 3'),
(6, 277, 'false');

-- For observation 278
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 278, 'Male'),
(2, 278, '2'),
(3, 278, 'good'),
(4, 278, 'child'),
(5, 278, 'Physical contact'),
(6, 278, 'true');

-- For observation 279
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 279, 'Female'),
(2, 279, '3'),
(3, 279, 'good'),
(4, 279, 'adult'),
(5, 279, 'Aggressive level 1'),
(6, 279, 'false');

-- For observation 280
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 280, 'Male'),
(2, 280, '1'),
(3, 280, 'good'),
(4, 280, 'teenage'),
(5, 280, 'Aggressive level 2'),
(6, 280, 'true');

-- For observation 281
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 281, 'Female'),
(2, 281, '2'),
(3, 281, 'good'),
(4, 281, 'child'),
(5, 281, 'Aggressive level 3'),
(6, 281, 'false');

-- For observation 282
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 282, 'Male'),
(2, 282, '3'),
(3, 282, 'good'),
(4, 282, 'adult'),
(5, 282, 'Physical contact'),
(6, 282, 'true');

-- For observation 283
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 283, 'Female'),
(2, 283, '1'),
(3, 283, 'good'),
(4, 283, 'teenage'),
(5, 283, 'Aggressive level 1'),
(6, 283, 'false');

-- For observation 284
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 284, 'Male'),
(2, 284, '2'),
(3, 284, 'good'),
(4, 284, 'child'),
(5, 284, 'Aggressive level 2'),
(6, 284, 'true');

-- For observation 285
INSERT INTO observation_attribute_values (attribute_id, observation_id, value)
VALUES
(1, 285, 'Female'),
(2, 285, '3'),
(3, 285, 'good'),
(4, 285, 'adult'),
(5, 285, 'Aggressive level 3'),
(6, 285, 'false');

