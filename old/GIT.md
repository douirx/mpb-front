# Recap des commandes de GIT


## Creer une branche et la push sur un repot distant

mkdir monprojet-mabranch
git init
touch 0.txt
git add .
git commit -m "First Commit"
git branch mabranch
git checkout mabranch
git remote add origin repourl
git push -u origin mabranch
