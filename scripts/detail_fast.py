from detail_lib import add, S

def U(
    slug: str,
    look: str,
    when: str,
    plain: str,
    longform: list[str],
    longformEn: list[str],
    elook: str,
    ewhen: str,
    eplain: str,
    steps: list[str],
    esteps: list[str],
    nat=None,
    enat=None,
    hum=None,
    ehum=None,
    check=None,
    echeck=None,
    dont=None,
    edont=None,
    test=None,
    etest=None,
    prev=None,
    eprev=None,
):
    k = dict(
        look=look, when=when, plain=plain, longform=longform, longformEn=longformEn,
        elook=elook, ewhen=ewhen, eplain=eplain, steps=steps, esteps=esteps,
    )
    for key, val in dict(
        nat=nat, enat=enat, hum=hum, ehum=ehum, check=check, echeck=echeck,
        dont=dont, edont=edont, test=test, etest=etest, prev=prev, eprev=eprev,
    ).items():
        if val:
            k[key] = val
    add(slug, **k)
