---
layout: default
title: "读书"
permalink: /reading/
---

# 读书

这里展示与读书相关的文章。

<ul>
  {% for post in site.posts %}
    {% if post.categories contains "reading" %}
      <li>
        <a href="{{ post.url }}">{{ post.title }}</a> - {{ post.date | date: "%Y-%m-%d" }}
      </li>
    {% endif %}
  {% endfor %}
</ul>
