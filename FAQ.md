---
title: FAQ
---

# Frequently Answered Questions

This is a place to gather the solutions this plugin provides
for problems encountered by users on Discord, Github, etc.

## Vite cannot import a file outside of the project directory

If Vite is giving you grief about importing content outside of
an allowed directory, configure your server allow list
so that you can import files from the directory:

**for SvelteKit**
``` ts
const config = {
  kit: {
    vite: {
      server: {
        fs: {
          allow: ['..'] // allow serving files one level below the project root
        }
      },
```
