import React, { createContext, FC, useState, ReactNode, useMemo, useEffect, useContext } from 'react';
const  AplRenderer = require('apl-viewhost-web')

const AlexaAPL = createContext({
  renderer: undefined,
  loaded: false
})

const AlexaAPLProvider: FC<ReactNode & {
  loadingContent?: ReactNode | string;
}> = ({children,loadingContent}) => {
  const [aplInitialized, isAPLInitialized] = useState(false)
  useEffect(() => {
    AplRenderer.initEngine()
    .then(() => {
      isAPLInitialized(true)
    })
    .catch((e: Error) => {
      console.log(e)
    })
  }, [])
  const childComponent = useMemo((): ReactNode => {
      if (aplInitialized) return children;
      if (loadingContent) return loadingContent;
      return <p>Initilizing APL Renderer...</p>
  }, [aplInitialized, children,loadingContent])
  return <AlexaAPL.Provider
      value={{
          renderer: AplRenderer,
          loaded: aplInitialized
      }}
      children={childComponent}
  />
}
const useAlexaAPLRenderer = () => {
  return useContext(AlexaAPL)
}

export type AplRendererEnvironment = {
  agentName: string;
  agentVersion: string;
  allowOpenUrl: boolean;
  disallowVideo: boolean;
}
export type AplRendererViewports = {
  width: number;
  height: number;
  dpi: number;
}
export type AplRendererCreationParam = {
  content: object;
  view: string;
  environment: AplRendererEnvironment;
  viewport: AplRendererViewports;
  theme: 'dark' | 'light';
  developerToolOptions: {
      mappdingKey: string;
      writeKeys: string[]
  },
  utcTime: number;
  localTimeAdjustment: number;
}
export type AplRendererOptions = Partial<Omit<AplRendererCreationParam, 'content' | 'view'>>

export type APLDocument = object;
export type APLViewerContentProps = {
  aplDocument: APLDocument;
  datasource?: object;
  viewerElementId: string;
  options?: AplRendererOptions;
}
export type APLViewerProps = {
  aplDocument: APLDocument;
  datasource?: object;
  viewerElementId?: string;
  options?: AplRendererOptions;
  loadingContent?: ReactNode;
}

const APLViewerContent: FC<APLViewerContentProps> = ({aplDocument, viewerElementId, datasource, options}) => {
  const {
      loaded,
      renderer,
  } = useAlexaAPLRenderer()
  const aplContent = useMemo(() => {
    /*
      if (isValidElement(aplDocument)) {
          const directive = new APLDocument(aplDocument).getDirective()
          return JSON.stringify(directive.document)
      }
      */
      if (typeof aplDocument === 'string') return aplDocument
      return JSON.stringify(aplDocument)
  }, [aplDocument])
  useEffect(() => {
      if (!loaded) return;
      const content = AplRenderer.Content.create(aplContent);
      if (content && datasource) {
        content.addData('payload', JSON.stringify(datasource))
      }
      const createOptions = {
          view: document.getElementById(viewerElementId) /* element where the APL document should be rendered to */,
          environment:options && options.environment ? options.environment : {
            agentName: "APL Sandbox",
            agentVersion: "1.0",
            allowOpenUrl: true,
            disallowVideo: false,
          },
          viewport: options && options.viewport ? options.viewport :{
            width: 1024,
            height: 600,
            dpi: 96,
          },
          theme: options && options.theme ? options.theme :"dark",
          developerToolOptions:options && options.developerToolOptions ? options.developerToolOptions :  {
            mappingKey: "auth-id",
            writeKeys: ["auth-banana", "auth-id"],
          },
          utcTime: options && options.utcTime ? options.utcTime :Date.now(),
          localTimeAdjustment: options && options.localTimeAdjustment ? options.localTimeAdjustment :-new Date().getTimezoneOffset() * 60 * 1000,
      }
      const renderer = AplRenderer.default.create({
          content,
          ...createOptions,
      });
      renderer.init()
  }, [loaded, renderer, aplContent, viewerElementId, datasource])
  return  <div id={viewerElementId} />

}
export const APLViewer: FC<APLViewerProps> = ({aplDocument,loadingContent, options, datasource, viewerElementId = 'aplViewer'}) => {
  return (
      <AlexaAPLProvider loadingContent={loadingContent}>
          <APLViewerContent
              viewerElementId={viewerElementId}
              aplDocument={aplDocument}
              datasource={datasource}
              options={options}
          />
      </AlexaAPLProvider>
  )
}
