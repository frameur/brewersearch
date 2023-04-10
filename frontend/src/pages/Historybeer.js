import React, { useState, useEffect, useRef } from 'react'
import Navigation from '../components/Navigation'
import './history.css'
import img1 from './images/intro.jpeg'
import img3 from './images/sumeriens.webp'
import img5 from './images/grec.webp'
import img8 from './images/brasseur.webp'
import img9 from './images/guildes.webp'
import img10 from './images/cervoise.webp'
import img11 from './images/revolution.webp'
import img12 from './images/pasteur.webp'
import img13 from './images/moderne.webp'
import img14 from './images/declin.webp'
import img15 from './images/renouveau.webp'
import img16 from './images/bocks.webp'

export default function Historybeer() {
  const sections = [...document.querySelectorAll('.content-section')]
  const navLinks = [...document.querySelectorAll('nav a')]
  const [firstLoad, setFirstLoad] = useState(true)
  const [data, setData] = useState([])
  const savedIndexRef = useRef()
  let resizeObserver
  let intersectionObserver

  useEffect(() => {
    const handleResize = () => {
      if (!firstLoad) {
        const newData = sections.map((section) => section.offsetTop)
        setData(newData)
        setFirstLoad(false)
      }
    }

    const handleScroll = () => {
      const trigger = window.scrollY + window.innerHeight / 3

      for (const i of sections) {
        const index = sections.indexOf(i)
        const section = document.getElementById(i.id)

        if (
          section.offsetTop <= trigger &&
          section.offsetTop + section.offsetHeight > trigger
        ) {
          if (index !== savedIndexRef.current) {
            savedIndexRef.current = index
            addClassNameAndClear(index)
          }
          break
        }

        if (index === data.length - 1 && trigger >= data[index]) {
          if (index !== savedIndexRef.current) {
            savedIndexRef.current = index
            addClassNameAndClear(index)
          }
        }
      }
    }

    const startWatching = (entries) => {
      if (entries[0].isIntersecting) {
        window.addEventListener('scroll', handleScroll)
      } else if (!entries[0].isIntersecting) {
        const elToClean = navLinks.find((navLink) =>
          navLink.className.includes('marked')
        )
        if (elToClean) elToClean.classList.remove('marked')
        savedIndexRef.current = undefined
        window.removeEventListener('scroll', handleScroll)
      }
    }

    const documentationContent = document.querySelector(
      '.documentation-content'
    )
    if (documentationContent) {
      window.addEventListener('load', handleResize)
      window.addEventListener('resize', handleResize)
      const resizeObserver = new ResizeObserver(handleResize)
      resizeObserver.observe(documentationContent)
      const intersectionObserver = new IntersectionObserver(startWatching, {
        rootMargin: '10% 0px',
      })
      intersectionObserver.observe(documentationContent)
    }

    navLinks.forEach((navLink, index) => {
      navLink.addEventListener('click', handleNavLinkClick)
    })

    return () => {
      window.removeEventListener('load', handleResize)
      window.removeEventListener('resize', handleResize)
      if (resizeObserver) {
        resizeObserver.disconnect()
      }
      if (intersectionObserver) {
        intersectionObserver.disconnect()
      }
      navLinks.forEach((navLink) => {
        navLink.removeEventListener('click', handleNavLinkClick)
      })
      window.removeEventListener('scroll', handleScroll)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleNavLinkClick = (e) => {
    e.preventDefault()
    const index = navLinks.indexOf(e.target)
    const section = document.getElementById(sections[index].id)
    window.scrollTo({
      top: section.offsetTop,
      behavior: 'smooth',
    })
  }
  const addClassNameAndClear = (index) => {
    const elToClean = navLinks.find((navLink) =>
      navLink.className.includes('marked')
    )
    if (elToClean) elToClean.classList.remove('marked')
    navLinks[index].classList.add('marked')
  }

  return (
    <div>
      <Navigation />
      <h1>histoire de la biére</h1>
      <div className="documentation-container">
        <nav>
          <a href="#introduction">Introduction</a>
          <a href="#1">Antiquité</a>
          <a href="#2">Moyen Age</a>
          <a href="#3">Renaissance</a>
          <a href="#4">Ere Moderne</a>
          <a href="#5">XIXE Siécle </a>
          <a href="#6">XXE Siécle</a>
          <a href="#7">XXIE Siécle</a>
          <a href="#guildes">Les Guildes</a>
          <a href="#pasteur">Louis Pasteur</a>
          <a href="#bocks">Les Sous Bocks</a>
          <a href="#conclusion">Conclusion</a>
        </nav>
        <div className="documentation-content">
          <section className="content-section" id="introduction">
            <h2>
              Une histoire riche en évolution : L'évolution de la bière à
              travers les époques
            </h2>
            <img src={img1} alt="" />
            <p>
              La bière, cette boisson alcoolisée à base de céréales fermentées,
              a une histoire fascinante qui remonte à l'Antiquité. Depuis sa
              découverte fortuite il y a des milliers d'années, la bière a connu
              une évolution constante, devenant une boisson appréciée dans le
              monde entier. Au fil des époques, l'histoire de la bière a été
              marquée par des transformations technologiques, des influences
              culturelles, des changements économiques et des mouvements
              sociaux. Dans cet article, nous allons explorer l'histoire de la
              bière par époque, en mettant en lumière les moments clés de son
              développement et de son évolution. De l'Antiquité à nos jours,
              découvrez comment la bière a évolué pour devenir une boisson
              diversifiée, avec un accent sur les périodes clés qui ont façonné
              son histoire.
            </p>
          </section>
          <section className="content-section" id="chine">
            <h2>
              1 - L'Antiquité : La découverte fortuite de la bière et ses
              premiers usages.
            </h2>
            <img src={img3} alt="" />

            <p>
              La bière aurait été découverte par accident il y a plus de 7 000
              ans. Les Sumériens de la Mésopotamie ancienne utilisaient des
              céréales fermentées pour produire de la bière, qu'ils
              considéraient comme une boisson courante dans leur vie
              quotidienne. Les Égyptiens, les Babyloniens et les Grecs de
              l'Antiquité consommaient également de la bière et la considéraient
              comme une boisson sacrée, utilisée lors de cérémonies religieuses.
            </p>
          </section>
          <section className="content-section" id="sumériens">
            <h2>
              2 - Moyen Âge : La bière comme boisson quotidienne et la montée
              des brasseries.
            </h2>
            <img src={img8} alt="" />

            <p>
              Au Moyen Âge, la bière était devenue une boisson essentielle en
              Europe. Les monastères jouaient un rôle clé dans la production de
              bière, et les moines brassaient leur propre bière pour la
              consommation interne ainsi que pour la distribution aux
              populations locales. La bière était considérée comme une
              alternative plus sûre à l'eau, souvent contaminée, car le
              processus de brassage impliquait une ébullition qui tuait les
              bactéries, rendant ainsi la bière plus sûre à boire. De plus, la
              bière était également utilisée à des fins médicinales, considérée
              comme ayant des propriétés curatives.
            </p>
          </section>
          <section className="content-section" id="egyptiens">
            <h2>3 - Renaissance : L'essor de la bière commerciale</h2>
            <img src={img11} alt="" />

            <p>
              Avec l'avènement de la Renaissance, la bière est devenue une
              boisson commerciale largement répandue en Europe. Les brasseries
              se sont développées et la bière a commencé à être produite à plus
              grande échelle pour répondre à la demande croissante. De nouvelles
              techniques de brassage ont été développées, notamment
              l'utilisation de houblon comme agent de conservation et pour
              donner de l'amertume à la bière. Les premières lois sur la pureté
              de la bière, telles que le Reinheitsgebot en Allemagne en 1516,
              ont été édictées pour garantir la qualité des bières produites.
            </p>
          </section>
          <section className="content-section" id="grecs">
            <h2>4 - Révolution industrielle : L'ère des brasseries modernes</h2>
            <img src={img14} alt="" />

            <p>
              La révolution industrielle du XVIIIe siècle a transformé la
              production de bière. Les progrès technologiques tels que la
              machine à vapeur et la pasteurisation ont permis la création de
              brasseries modernes, utilisant des machines pour produire de
              grandes quantités de bière de manière plus efficace. Cela a
              également conduit à l'émergence de grandes marques de bière qui
              sont devenues populaires dans le monde entier, avec l'utilisation
              de nouvelles méthodes de production et de distribution.
            </p>
          </section>
          <section className="content-section" id="gaulois">
            <h2>5 - XIXe siècle : La bière, une boisson de masse</h2>
            <img src={img13} alt="" />
            <p>
              Au XIXe siècle, la bière est devenue une boisson de masse,
              largement consommée par les classes ouvrières en Europe et en
              Amérique du Nord. La production de bière a continué à augmenter et
              de nouvelles technologies, telles que la réfrigération et la
              pasteurisation, ont permis de produire des bières plus stables et
              de les transporter sur de plus longues distances. Cependant, la
              qualité de la bière a parfois été compromise par la recherche
              d'une production à grande échelle et de profitsAu XIXe siècle, la
              bière est devenue une boisson de masse, largement consommée par
              les classes ouvrières en Europe et en Amérique du Nord. La
              production de bière a continué à augmenter et de nouvelles
              technologies, telles que la réfrigération et la pasteurisation,
              ont permis de produire des bières plus stables et de les
              transporter sur de plus longues distances. Cependant, la qualité
              de la bière a parfois été compromise par la recherche d'une
              production à grande échelle et de profits
            </p>
          </section>
          <section className="content-section" id="moine">
            <h2>
              6 - XXe siècle : La bière dans la culture de masse et la
              diversification.
            </h2>
            <img src={img10} alt="" />

            <p>
              Au XXe siècle, la bière est devenue une partie intégrante de la
              culture de masse, avec l'émergence de la publicité, de la
              promotion et de la commercialisation de marques de bière à
              l'échelle mondiale. La consolidation de l'industrie brassicole a
              conduit à la domination de quelques grandes entreprises
              brassicoles dans de nombreux pays, tandis que d'autres brasseries
              plus petites ont continué à produire des bières artisanales et
              locales. <br />
              <br /> Au cours du XXe siècle, la diversification des styles de
              bière a également augmenté, avec l'émergence de nouveaux types de
              bières tels que les bières blondes, brunes, IPA (India Pale Ale),
              stouts, porters, et bien d'autres. La bière est devenue une
              boisson appréciée pour sa variété de goûts, d'arômes et de styles,
              offrant aux consommateurs un large éventail de choix.
            </p>
          </section>
          <section className="content-section" id="appellation">
            <h2>
              7 - XXIe siècle : L'essor de la bière artisanale et du mouvement
              de brassage à domicile.
            </h2>
            <img src={img15} alt="" />

            <p>
              Au cours du XXIe siècle, la bière artisanale a connu une
              popularité croissante, avec l'émergence de nombreuses brasseries
              artisanales produisant des bières de petite échelle avec des
              ingrédients de qualité, souvent locaux et biologiques. Le
              mouvement de brassage à domicile s'est également développé,
              permettant aux amateurs de bière de produire leur propre bière à
              la maison avec des équipements et des ingrédients disponibles dans
              le commerce. <br />
              <br />
              De plus, la conscience croissante de l'impact environnemental et
              de la durabilité a également influencé l'industrie brassicole,
              avec une demande croissante de bières biologiques, locales et
              respectueuses de l'environnement.
            </p>
          </section>
          <section className="content-section" id="guildes">
            <h2>
              Le pouvoir des guildes brassicoles : L'influence des associations
              professionnelles dans l'histoire de la bière
            </h2>
            <img src={img9} alt="" />

            <p>
              Au Moyen Âge, les guildes brassicoles ont joué un rôle essentiel
              dans l'histoire de la bière. Ces associations professionnelles
              regroupaient les brasseurs et étaient chargées de réguler et de
              promouvoir la production de bière dans les villes. Les guildes
              brassicoles étaient dotées d'un pouvoir considérable, notamment
              dans la définition des normes de production, la fixation des prix,
              la protection des intérêts des brasseurs et la transmission des
              savoirs brassicoles. Elles ont joué un rôle majeur dans le
              développement et la diffusion de la bière à travers l'Europe.
              <br />
              <br />
              1-Les origines des guildes brassicoles et leur rôle dans la
              production de bière médiévale. <br /> 2-L'influence des guildes
              brassicoles sur la qualité et la régulation de la bière.
              <br /> 3-Les défis et les conflits auxquels les guildes
              brassicoles ont dû faire face. <br /> 4-L'héritage des guildes
              brassicoles dans l'industrie brassicole moderne.
              <br />
              <br />
              En explorant l'histoire des guildes brassicoles, nous pouvons
              mieux comprendre leur rôle clé dans l'évolution de la bière et
              comment elles ont contribué à façonner les pratiques brassicoles
              d'aujourd'hui.
            </p>
          </section>
          <section className="content-section" id="pasteur">
            <h2>
              Pasteur et la bière : L'influence du célèbre scientifique dans
              l'histoire brassicole
            </h2>
            <img src={img12} alt="" />

            <p>
              Louis Pasteur, célèbre scientifique français du XIXe siècle, a
              joué un rôle révolutionnaire dans l'histoire de la bière. Ses
              travaux scientifiques sur la fermentation et la pasteurisation ont
              eu un impact majeur sur la production de bière et ont contribué à
              améliorer la qualité et la sécurité de cette boisson emblématique.
              Les découvertes de Pasteur ont ouvert la voie à des avancées
              technologiques importantes dans l'industrie brassicole,
              transformant la manière dont la bière était produite, conservée et
              consommée. <br />
              <br />
              1-Les travaux de Pasteur sur la fermentation et leur impact sur la
              production de bière. <br />
              2-La pasteurisation de la bière et son rôle dans l'amélioration de
              la sécurité alimentaire. <br />
              3-L'application des découvertes de Pasteur dans l'industrie
              brassicole et ses conséquences. <br />
              4-L'héritage de Pasteur dans la science brassicole contemporaine.{' '}
              <br />
              <br />
              En explorant le lien entre Louis Pasteur et la bière, nous pouvons
              mieux comprendre l'importance de ses découvertes scientifiques
              dans l'histoire brassicole et comment elles ont influencé la
              production et la consommation de bière telle que nous la
              connaissons aujourd'hui.
            </p>
          </section>

          <section className="content-section" id="bocks">
            <h2>De la publicité à la collection : L'histoire des sous-bocks</h2>
            <img src={img16} alt="" />
            <p>
              Si la bière a 5 000 ans d’existence, le sous-bock est beaucoup
              plus jeune. 1867 serait la date du premier exemplaire en carton
              produit à Luckenwald, en Allemagne, par la société des frères Les
              sous-bocks, également connus sous le nom de dessous de verre, sont
              devenus un élément courant de la culture de la bière, utilisés
              pour protéger les surfaces des gouttes de condensation sous les
              verres de bière. Cependant, ces petits objets ont également une
              longue histoire en tant qu'outil de publicité, de collection et de
              promotion pour les brasseries du monde entier. <br />
              <br /> 1-Les origines des sous-bocks et leur utilisation comme
              outil de publicité pour les brasseries. <br />
              2-L'évolution des designs et des matériaux utilisés pour les
              sous-bocks au fil du temps. <br /> 3-La popularité des sous-bocks
              comme objets de collection et de promotion pour les amateurs de
              bière. <br /> 4-Les utilisations créatives et les tendances
              actuelles dans le monde des sous-bocks. <br />
              <br /> En explorant l'histoire des sous-bocks, nous pouvons mieux
              comprendre leur rôle en tant qu'objet de publicité, de collection
              et de promotion dans l'univers brassicole, ainsi que leur
              évolution au fil du temps et leur impact sur la culture de la
              bière.
            </p>
          </section>
          <section className="content-section" id="moderne">
            <h2>Conclusion</h2>
            <img src={img5} alt="" />

            <p>
              En conclusion, l'histoire de la bière est riche et complexe,
              depuis sa découverte fortuite dans l'Antiquité jusqu'à son statut
              actuel de boisson appréciée dans le monde entier, avec une
              diversité de styles et de saveurs. L'évolution de la bière au fil
              des époques a été influencée par des facteurs tels que la
              technologie, la culture, l'économie et l'environnement, et
              continue de se développer pour répondre aux goûts et aux
              préférences des consommateurs d'aujourd'hui.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
