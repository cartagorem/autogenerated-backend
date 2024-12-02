# Simple Backend

Some basic docker commands:

```bash
# buid & run a docker image
docker build [-d] -t  test-app:latest ./ # -d means deattach mode

docker run --net=host test-app:latest # --net=host (optional)

docker images # list images

docker logs <PROCESS-ID> # works good with deattach mode

# delete image
docker rmi <IMAGE-ID> [-f] # -f means force kill

docker ps # lsit running containers
docker kill <PROCESS-ID>
```
