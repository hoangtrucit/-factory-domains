
CREATE TABLE IF NOT EXISTS public.account
  (
     id    UUID DEFAULT Gen_random_uuid() NOT NULL CONSTRAINT account_pk PRIMARY
     KEY,
     email VARCHAR(255)
  ); 

CREATE TABLE IF NOT EXISTS public.post
  (
     id         UUID DEFAULT Gen_random_uuid() NOT NULL CONSTRAINT post_pk
     PRIMARY KEY,
     title      VARCHAR,
     created_by UUID NOT NULL CONSTRAINT post_account_id_fk REFERENCES
     public.account
  ); 

CREATE TABLE IF NOT EXISTS public.post_like
  (
     post_id UUID NOT NULL CONSTRAINT post_like_post_id_fk REFERENCES
     public.post,
     account_id UUID NOT NULL CONSTRAINT post_like_account_id_fk REFERENCES
     public.account,
     CONSTRAINT post_like_pk PRIMARY KEY (post_id, account_id)
  ); 

insert into public.account (id, email) VALUES ('e160f41b-780a-43bb-b776-e9bf267f5942', 'abc@gmail.com');
insert into public.post (title, created_by) VALUES 
('title 1','e160f41b-780a-43bb-b776-e9bf267f5942'),
('title 2','e160f41b-780a-43bb-b776-e9bf267f5942'),
('title 3','e160f41b-780a-43bb-b776-e9bf267f5942');