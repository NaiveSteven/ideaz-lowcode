git filter-branch --env-filter '
if [ "$GIT_AUTHOR_NAME" = "mjqin" ]
then
export GIT_AUTHOR_NAME="NaiveSteven"
export GIT_AUTHOR_EMAIL="1004537433@qq.com"
fi
' ref..HEAD

git filter-branch --env-filter '
if [ "$GIT_COMMITTER_NAME" = "mjqin" ]
then
export GIT_COMMITTER_NAME="NaiveSteven"
export GIT_COMMITTER_EMAIL="1004537433@qq.com"
fi
' ref..HEAD
