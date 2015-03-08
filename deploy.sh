mkdir ghpages
cp -R ./public/* ./ghpages/
cd ghpages
git init
git remote add origin https://github.com/vieiralucas/tetris.git
git checkout -b gh-pages
git add .
git commit -m "release!"
git push origin gh-pages --force
cd ..
rm -rf ghpages
echo "Finish deploy"
exit 0
