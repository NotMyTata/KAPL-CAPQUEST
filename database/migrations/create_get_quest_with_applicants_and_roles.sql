create or replace function get_quest_with_applicants_and_roles(q_id uuid)
returns json as $$
    select json_build_object(
        'quest', json_build_object(
            -- All quest fields
            'id', q.id,
            'title', q.title,
            'description', q.description,
            'difficulty', q.difficulty,
            -- ...add other quest fields as needed...
            'roles', (
                select json_agg(json_build_object(
                    'id', r.id,
                    'name', r.name
                ))
                from questRoles qr
                join role r on qr.role_id = r.id
                where qr.quest_id = q.id
            ),
            'applicants', (
                select json_agg(json_build_object(
                    'profile', p.*
                ))
                from questApplicant qa
                join profile p on qa.user_id = p.user_id
                where qa.quest_id = q.id
            )
            'poster_profile', poster.*
        )
    )
    from quest q
    join profile poster on q.owner_id = poster.user_id
    where q.id = q_id;
$$ language sql;