# Simple Backend

Some basic docker commands:

```bash
docker build [-d] -t  test-app:latest ./ # -d means deattach mode

docker run --net=host test-app:latest # --net=host (optional)

docker images

docker rmi <IMAGE-ID> [-f] # -f means force kill

docker ps

docker logs <PROCESS-ID>

docker kill <PROCESS-ID>
```
