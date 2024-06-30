superset fab create-admin \
    --username admin \
    --firstname Admin \
    --lastname User \
    --email admin@datapods.com \
    --password admin &&

superset db upgrade &&

superset load_examples &&

superset init

superset fab create-user \
    --username app \
    --firstname App \
    --lastname User \
    --email app@datapods.com \
    --password app