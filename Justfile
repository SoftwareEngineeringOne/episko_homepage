default:
    @just --list

code_1:
    nvim -O src/views/layout.pug src/views/static/index.pug

code_2:
    nvim src/views/components/snackbar.pug public/js/snackbar.js

code_3:
    nvim -O src/app.js src/routes/static.js

code_4:
    nvim -O src/models/user.js src/controllers/auth/loginController.js

code_5:
    nvim -O src/middleware/protectionMiddleware.js src/routes/posts.js

code_6:
    nvim -O src/controllers/postController.js src/models/post.js

code_7:
    nvim nginx/episko.conf

code_8:
    nvim docker-compose.yml

docker:
    echo "sudo docker-compose up" | wl-copy

snackbar:
    echo 'showSnackbarError("An unexpected error occured")' | wl-copy
