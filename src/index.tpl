<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta content="width=device-width, maximum-scale=1.0, minimum-scale=1.0, initial-scale=1.0" name="viewport" />
<meta content="HTML Layout Kit" name="copyright">
<meta content="EN" name="language">
<meta content="index,follow" name="robots" />
<meta content="yes" name="apple-touch-fullscreen" />
<meta content="HTML Layout Kit" name="og:site_name" />
<script> window.prerenderReady = false; </script>
<%= require(`./pages/${page}/head.html`) %>
</head>
<body>
<%= require(`./pages/${page}/template.js`).default() %>
</body>
</html>
