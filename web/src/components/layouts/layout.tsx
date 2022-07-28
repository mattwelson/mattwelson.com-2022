import * as React from "react"
import { Link } from "gatsby"
import { PortableTextComponentsProvider } from "@portabletext/react"
import MetaImage from "../../sanityComponents/MetaImage"
import ImageCollection from "../../sanityComponents/ImageCollection"

const Layout: React.FunctionComponent<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <PortableTextComponentsProvider
      components={{
        types: {
          // TODO: add types for p (block?) and all headings, an anything else! Add classes to format headings and p to have mb-4 or something
          metaimage: MetaImage,
          imagecollection: ImageCollection,
        },
      }}
    >
      <div className='grid min-h-screen grid-rows-[auto_1fr_auto] items-start'>
        <header className='grid-content bg-slate-500 py-4 text-white'>
          <div className='font-sans text-lg font-bold '>
            <Link to='/'>Matt Welson</Link>
          </div>
        </header>
        <main className='grid-content'>{children}</main>
        <footer className='grid-content mt-16 pt-8 pb-16 '>
          <div>
            Footer will have some cool links to twitter, instagram and strava.
            As well as a super bold Github link. Very important.
          </div>
        </footer>
      </div>
    </PortableTextComponentsProvider>
  )
}

export default Layout
