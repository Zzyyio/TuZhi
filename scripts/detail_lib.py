"""Collector. Each article is a dict ready to emit."""
DATA: dict = {}

def S(*a):
    return list(a)

def add(slug: str, **k):
    DATA[slug] = k
