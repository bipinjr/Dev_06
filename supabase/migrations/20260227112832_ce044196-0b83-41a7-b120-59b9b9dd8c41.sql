
-- Insert support interests: adopt, foster, donate_food, medical_support
INSERT INTO adoption_interests (user_id, report_id, support_type, message, created_at) VALUES
('2bc65a82-dd17-46b6-9496-87dd0254f5d2', '643ee536-e558-43c0-9d68-3614634b44b4', 'adopt', 'I would love to adopt this dog once recovered. I have a large home with a garden.', now() - interval '12 days'),
('2bc65a82-dd17-46b6-9496-87dd0254f5d2', '07a9462d-9f3a-44e3-86a4-ee61d78bb804', 'medical_support', 'Donating ₹5000 for the critically injured cow''s surgery and treatment. Please save her!', now() - interval '2 days'),
('2bc65a82-dd17-46b6-9496-87dd0254f5d2', 'a41770e4-4106-413e-98ed-c7d6a9982a00', 'foster', 'I can foster the abandoned puppies until they find permanent homes.', now() - interval '12 hours'),
('2bc65a82-dd17-46b6-9496-87dd0254f5d2', 'd6dcbec0-a0a6-4c5e-b841-738ef1703d21', 'donate_food', 'I can provide bird food and a cage for recovery. Located nearby in Koramangala.', now() - interval '4 hours');
