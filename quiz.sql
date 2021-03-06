PGDMP     ;                     w            quiz    9.6.5    9.6.5 8    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                       false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                       false            �           1262    33022    quiz    DATABASE     �   CREATE DATABASE quiz WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'English_United States.1252' LC_CTYPE = 'English_United States.1252';
    DROP DATABASE quiz;
             postgres    false                        2615    2200    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
             postgres    false            �           0    0    SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                  postgres    false    3                        2615    33023    quiz    SCHEMA        CREATE SCHEMA quiz;
    DROP SCHEMA quiz;
             postgres    false                        3079    12387    plpgsql 	   EXTENSION     ?   CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;
    DROP EXTENSION plpgsql;
                  false            �           0    0    EXTENSION plpgsql    COMMENT     @   COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';
                       false    1            �            1259    41220    paper_sequence    SEQUENCE     u   CREATE SEQUENCE paper_sequence
    START WITH 1000
    INCREMENT BY 1
    MINVALUE 1000
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.paper_sequence;
       public       postgres    false    3            �            1259    33050 	   level_lkp    TABLE     P   CREATE TABLE level_lkp (
    id integer NOT NULL,
    name character varying
);
    DROP TABLE quiz.level_lkp;
       quiz         postgres    false    7            �            1259    33078    map_user_paper    TABLE     w   CREATE TABLE map_user_paper (
    id integer NOT NULL,
    fk_user integer,
    fk_paper integer,
    marks integer
);
     DROP TABLE quiz.map_user_paper;
       quiz         postgres    false    7            �            1259    41228    map_user_paper_sequence    SEQUENCE     ~   CREATE SEQUENCE map_user_paper_sequence
    START WITH 1000
    INCREMENT BY 1
    MINVALUE 1000
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE quiz.map_user_paper_sequence;
       quiz       postgres    false    7            �            1259    33093    map_user_question_choice    TABLE     �   CREATE TABLE map_user_question_choice (
    id integer NOT NULL,
    fk_user integer,
    fk_question integer,
    fk_choice integer,
    is_correct boolean,
    marks integer,
    fk_paper integer
);
 *   DROP TABLE quiz.map_user_question_choice;
       quiz         postgres    false    7            �            1259    41230 !   map_user_question_choice_sequence    SEQUENCE     �   CREATE SEQUENCE map_user_question_choice_sequence
    START WITH 1000
    INCREMENT BY 1
    MINVALUE 1000
    NO MAXVALUE
    CACHE 1;
 6   DROP SEQUENCE quiz.map_user_question_choice_sequence;
       quiz       postgres    false    7            �            1259    33064    option    TABLE     �   CREATE TABLE option (
    id integer NOT NULL,
    fk_question_id integer,
    description character varying,
    is_correct_choice boolean
);
    DROP TABLE quiz.option;
       quiz         postgres    false    7            �            1259    41226    option_sequence    SEQUENCE     v   CREATE SEQUENCE option_sequence
    START WITH 1000
    INCREMENT BY 1
    MINVALUE 1000
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE quiz.option_sequence;
       quiz       postgres    false    7            �            1259    33032    paper    TABLE     �   CREATE TABLE paper (
    id bigint NOT NULL,
    name character varying(100),
    description character varying(200),
    total_time integer,
    created_by character varying(100),
    created_date time without time zone,
    total_question integer
);
    DROP TABLE quiz.paper;
       quiz         postgres    false    7            �            1259    41222    paper_sequence    SEQUENCE     u   CREATE SEQUENCE paper_sequence
    START WITH 1000
    INCREMENT BY 1
    MINVALUE 1000
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE quiz.paper_sequence;
       quiz       postgres    false    7            �            1259    33037    question    TABLE     �   CREATE TABLE question (
    id integer NOT NULL,
    question character varying(500),
    fk_paper_id integer,
    is_correct boolean,
    correct_mark integer,
    wrong_mark integer,
    fk_level integer,
    fk_correct_choice integer
);
    DROP TABLE quiz.question;
       quiz         postgres    false    7            �            1259    41224    question_sequence    SEQUENCE     x   CREATE SEQUENCE question_sequence
    START WITH 1000
    INCREMENT BY 1
    MINVALUE 1000
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE quiz.question_sequence;
       quiz       postgres    false    7            �            1259    33024    users    TABLE     E  CREATE TABLE users (
    id integer NOT NULL,
    username character varying(100) NOT NULL,
    role character varying(100) NOT NULL,
    phone character varying(10),
    password character varying(1000),
    created_by character varying(100),
    name character varying(100),
    created_date timestamp without time zone
);
    DROP TABLE quiz.users;
       quiz         postgres    false    7            �            1259    33196    user_sequence    SEQUENCE     o   CREATE SEQUENCE user_sequence
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE quiz.user_sequence;
       quiz       postgres    false    7    186            �           0    0    user_sequence    SEQUENCE OWNED BY     0   ALTER SEQUENCE user_sequence OWNED BY users.id;
            quiz       postgres    false    193            �           0    0    paper_sequence    SEQUENCE SET     9   SELECT pg_catalog.setval('paper_sequence', 1000, false);
            public       postgres    false    194            �          0    33050 	   level_lkp 
   TABLE DATA                     quiz       postgres    false    189   :       �          0    33078    map_user_paper 
   TABLE DATA                     quiz       postgres    false    191   �:       �           0    0    map_user_paper_sequence    SEQUENCE SET     A   SELECT pg_catalog.setval('map_user_paper_sequence', 1007, true);
            quiz       postgres    false    198            �          0    33093    map_user_question_choice 
   TABLE DATA                     quiz       postgres    false    192   ;       �           0    0 !   map_user_question_choice_sequence    SEQUENCE SET     K   SELECT pg_catalog.setval('map_user_question_choice_sequence', 1014, true);
            quiz       postgres    false    199            �          0    33064    option 
   TABLE DATA                     quiz       postgres    false    190   �;       �           0    0    option_sequence    SEQUENCE SET     9   SELECT pg_catalog.setval('option_sequence', 1087, true);
            quiz       postgres    false    197            �          0    33032    paper 
   TABLE DATA                     quiz       postgres    false    187   �=       �           0    0    paper_sequence    SEQUENCE SET     8   SELECT pg_catalog.setval('paper_sequence', 1002, true);
            quiz       postgres    false    195            �          0    33037    question 
   TABLE DATA                     quiz       postgres    false    188   !?       �           0    0    question_sequence    SEQUENCE SET     ;   SELECT pg_catalog.setval('question_sequence', 1023, true);
            quiz       postgres    false    196            �           0    0    user_sequence    SEQUENCE SET     5   SELECT pg_catalog.setval('user_sequence', 11, true);
            quiz       postgres    false    193            �          0    33024    users 
   TABLE DATA                     quiz       postgres    false    186   c@                  2606    33057    level_lkp level_lkp_pkey 
   CONSTRAINT     O   ALTER TABLE ONLY level_lkp
    ADD CONSTRAINT level_lkp_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY quiz.level_lkp DROP CONSTRAINT level_lkp_pkey;
       quiz         postgres    false    189    189                       2606    33082 "   map_user_paper map_user_paper_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY map_user_paper
    ADD CONSTRAINT map_user_paper_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY quiz.map_user_paper DROP CONSTRAINT map_user_paper_pkey;
       quiz         postgres    false    191    191                       2606    33097 6   map_user_question_choice map_user_question_choice_pkey 
   CONSTRAINT     m   ALTER TABLE ONLY map_user_question_choice
    ADD CONSTRAINT map_user_question_choice_pkey PRIMARY KEY (id);
 ^   ALTER TABLE ONLY quiz.map_user_question_choice DROP CONSTRAINT map_user_question_choice_pkey;
       quiz         postgres    false    192    192                       2606    33036    paper paper_pkey 
   CONSTRAINT     G   ALTER TABLE ONLY paper
    ADD CONSTRAINT paper_pkey PRIMARY KEY (id);
 8   ALTER TABLE ONLY quiz.paper DROP CONSTRAINT paper_pkey;
       quiz         postgres    false    187    187            �           2606    41219    users phone_unique 
   CONSTRAINT     G   ALTER TABLE ONLY users
    ADD CONSTRAINT phone_unique UNIQUE (phone);
 :   ALTER TABLE ONLY quiz.users DROP CONSTRAINT phone_unique;
       quiz         postgres    false    186    186            	           2606    33071    option question_option_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY option
    ADD CONSTRAINT question_option_pkey PRIMARY KEY (id);
 C   ALTER TABLE ONLY quiz.option DROP CONSTRAINT question_option_pkey;
       quiz         postgres    false    190    190                       2606    33044    question question_pkey 
   CONSTRAINT     M   ALTER TABLE ONLY question
    ADD CONSTRAINT question_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY quiz.question DROP CONSTRAINT question_pkey;
       quiz         postgres    false    188    188            �           2606    33114    users user_pkey 
   CONSTRAINT     F   ALTER TABLE ONLY users
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);
 7   ALTER TABLE ONLY quiz.users DROP CONSTRAINT user_pkey;
       quiz         postgres    false    186    186            �           2606    41217    users username_unique 
   CONSTRAINT     M   ALTER TABLE ONLY users
    ADD CONSTRAINT username_unique UNIQUE (username);
 =   ALTER TABLE ONLY quiz.users DROP CONSTRAINT username_unique;
       quiz         postgres    false    186    186                       1259    33063    fki_fk_level_question    INDEX     G   CREATE INDEX fki_fk_level_question ON question USING btree (fk_level);
 '   DROP INDEX quiz.fki_fk_level_question;
       quiz         postgres    false    188                       1259    33077    fki_fk_question_option    INDEX     L   CREATE INDEX fki_fk_question_option ON option USING btree (fk_question_id);
 (   DROP INDEX quiz.fki_fk_question_option;
       quiz         postgres    false    190                       2606    33058    question fk_level_question    FK CONSTRAINT     p   ALTER TABLE ONLY question
    ADD CONSTRAINT fk_level_question FOREIGN KEY (fk_level) REFERENCES level_lkp(id);
 B   ALTER TABLE ONLY quiz.question DROP CONSTRAINT fk_level_question;
       quiz       postgres    false    189    188    2054                       2606    33108 &   map_user_question_choice fk_map_option    FK CONSTRAINT     z   ALTER TABLE ONLY map_user_question_choice
    ADD CONSTRAINT fk_map_option FOREIGN KEY (fk_choice) REFERENCES option(id);
 N   ALTER TABLE ONLY quiz.map_user_question_choice DROP CONSTRAINT fk_map_option;
       quiz       postgres    false    192    2057    190                       2606    33088    map_user_paper fk_map_paper    FK CONSTRAINT     m   ALTER TABLE ONLY map_user_paper
    ADD CONSTRAINT fk_map_paper FOREIGN KEY (fk_paper) REFERENCES paper(id);
 C   ALTER TABLE ONLY quiz.map_user_paper DROP CONSTRAINT fk_map_paper;
       quiz       postgres    false    191    2049    187                       2606    33115    map_user_paper fk_map_user    FK CONSTRAINT     k   ALTER TABLE ONLY map_user_paper
    ADD CONSTRAINT fk_map_user FOREIGN KEY (fk_user) REFERENCES users(id);
 B   ALTER TABLE ONLY quiz.map_user_paper DROP CONSTRAINT fk_map_user;
       quiz       postgres    false    2045    186    191                       2606    33120 $   map_user_question_choice fk_map_user    FK CONSTRAINT     u   ALTER TABLE ONLY map_user_question_choice
    ADD CONSTRAINT fk_map_user FOREIGN KEY (fk_user) REFERENCES users(id);
 L   ALTER TABLE ONLY quiz.map_user_question_choice DROP CONSTRAINT fk_map_user;
       quiz       postgres    false    192    186    2045                       2606    33045    question fk_paper_question    FK CONSTRAINT     o   ALTER TABLE ONLY question
    ADD CONSTRAINT fk_paper_question FOREIGN KEY (fk_paper_id) REFERENCES paper(id);
 B   ALTER TABLE ONLY quiz.question DROP CONSTRAINT fk_paper_question;
       quiz       postgres    false    2049    187    188                       2606    33103 $   map_user_question_choice fk_question    FK CONSTRAINT     |   ALTER TABLE ONLY map_user_question_choice
    ADD CONSTRAINT fk_question FOREIGN KEY (fk_question) REFERENCES question(id);
 L   ALTER TABLE ONLY quiz.map_user_question_choice DROP CONSTRAINT fk_question;
       quiz       postgres    false    188    2052    192                       2606    33072    option fk_question_option    FK CONSTRAINT     t   ALTER TABLE ONLY option
    ADD CONSTRAINT fk_question_option FOREIGN KEY (fk_question_id) REFERENCES question(id);
 A   ALTER TABLE ONLY quiz.option DROP CONSTRAINT fk_question_option;
       quiz       postgres    false    2052    188    190            �   [   x���v
Q���W�I-K͉��.P��L�Q�K�M�Ts�	uV�0�QP�uu��U״��$V�!P��cp$I����\<��<�C}B@:�� ��.�      �   w   x���v
Q���W�M,�/-N-�/H,H-R��L�QH��`a����bM�0G�P�`C#3 �PG�/��GӚ˓�5���&4r�)�ls�u�5�;h��T.. dɜ=      �   �   x�͒�
�0�w��F��ƨt�� ���]�ؔ��ڨ�_��k�������8��(�sYQ��ьr����EMs7<e{�V��]	�z۴�m��!�$�Ak��d]���v�fTڃ�1��\Fi@���Q�M�@Q�9jJ�{'�=ߩ��0ި�?�*2)(�[��*�Tŭ"�^�(�J0z�(F�,:����+����q�0�-      �   �  x���;KA��>�b:�b�>��E��D0�v�͊��j.��쌅���5������!�6���q�6�����������Q����e8�/t���p�cyC��S�O��П��m�a�����;��m�u}t����@}s����Ӱ�]l����g�=�b�^{�ㅔӘsܯgJ�K�i�=2����c��J/��E����|s\>S�%J��=.�1أ��92_�$��G����Ȇ��d1��=.�m�G�s\>[�e�}&�g-��|{\>�92_����_��/a�˗1��se\�2|Nc�����|�b��W�Ŋ�y����|sd�:.bW�����-��|^c���븈]]����a���1G��"vu�{d��=._��/�q���=._0أ��92_��K��#��q�"��|u\Į.!c��[�Q����/�q1bW�h�G�s���y̑�ʸ��K��#�%�q�2�|�����$�=._2أ�%�92_��K��#��q�"���-?j5.F      �     x����O�0���o����b)C�
T>ZX�k|i,�v��T��I�`bd��ݽ�߻�f�z�a��=����Fpt��cL+ƻ��^Lߨ��������e�=q�U3��=����.�Z�zN��*���-�a�~0'�4΍���"�q1�"
lY��U1Ug�r��&}p�c����IDE$§�����������i���'����ɀC��Ե��8�
S��9Ȣ�aHg�>��Y^��R}C�n'��[n��\�=�����!�f!c#|=|S��J��d��E��      �   2  x���=o�0��=��n���v>Q���T-�5B��J����oRA�J'^o6��Y^��\.^V���'��4�kӞh�l��/Ao��9[��ͥ�[kM}t;T�{�m���v�^9�/s�=��V�ۦ63z},֋%M��������j"��S��uQ��Tr���صj�5�&�5�X3~k�Z�a����̵�k�o���d�򷥤kM=V���r����ߖҮu>l���R�-�,\
��xq���ą�ZG.dMF.hA[h��5�oK��V��4.h�oK��B֌�-�b����*Ao      �   &  x����n�@��}��0A�]��]{E��
Z���4l#��J�>}�ƴ>@o朙����zK�) ��������&�-x.TP�YSw��h�Ky(�&W��E��Tp^&IS���z�%�*Pd}�J��d�z��#6Q�k����v'[��Z�6!r�9�=G��V�Q����eLױR��%�%h�y���r���u�16��4�c�*����ϰ]���e�L 4���o�r?�S�3-0ie�;����nu��K�<.t�-f�!Z�ľ�]�r#D�Z������v:ߏZ��     