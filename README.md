## Info
- If there are any issues with `docker-compose up` try `docker-compose pull` first
    - to update the rss-bridge image do `docker image ls` then `docker pull` the rss-bridge image
- localhost:3000 contains rss-bridge
- localhost:8000 contains app
- URI options can be provided 
    - found at https://github.com/rss-bridge/rss-bridge/wiki/Command-Line-Interface-(CLI)
    - specific params for a bridge found under PARAMETERS in php files in https://github.com/RSS-Bridge/rss-bridge/tree/master/bridges

## To-do
- [x] track read and unread
- smarten up frontend
- ability to add groups and rss
- stats? Usage? Save/bookmark items?
- change reddit links to old.reddit
- how to delete a feed - option to delete all past entries or keep them?
- often requires reloading or pressing back leads to stale pages - fix this