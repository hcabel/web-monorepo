// Libs
import Link from "next/link";

// External project
import { Types as ProjectApiTypes } from "@hcabel/bridges/ProjectApi";

// Design
import Style from "./Project.module.scss";

// Components
import GithubStats from "./GithubStats";
import VsCodeStats from "./VsCodeStats";
import YoutubeStats from "./YoutubeStats";

// Hooks
import { I18nDictText } from "Components/i18nText";

export interface IProjectProps {
id?: string;
className?: string;
style?: React.CSSProperties;
children?: React.ReactElement[] | React.ReactElement;

moreButtonRedirection?: string;
moreTextOverride?: string;

name: string;
stats?: ProjectApiTypes.IRouteGetProjectStats;

hideDescription?: boolean;
hideStats?: boolean;
i18n?: boolean;
}

export default function Project(props: IProjectProps) {
if (!props.name) {
return null;
}
return (
<article
id={props.id || ""}
className={`${Style.ProjectContainer} ${props.className || ""}`}
style={props.style || {}}
>
<div>
<h1
className={`h1 ${Style.ProjectName}`}
data-cy={`Project-Title`}
>
{props.name}
</h1>
{!props.hideDescription && (
<h4
className={`h4 ${Style.ProjectDescription}`}
data-cy={`Project-Description`}
>
<I18nDictText i18nKey={`${props.name}-Description`} />
</h4>
)}
{props.moreButtonRedirection && (
<Link
className={Style.ProjectMoreButton}
href={props.moreButtonRedirection}
prefetch={false}
>
{props.moreTextOverride ? (
props.i18n ? (
<I18nDictText
i18nKey={props.moreTextOverride}
/>
) : (
props.moreTextOverride
)
) : (
<I18nDictText i18nKey="MoreDetails" />
)}
</Link>
)}
</div>
{!props.hideStats && props.stats && (
<div className={Style.ProjectStats}>
{props.stats["youtube"] && (
<YoutubeStats stats={props.stats["youtube"]} />
)}
{props.stats["vscode marketplace"] && (
<VsCodeStats
stats={props.stats["vscode marketplace"]}
/>
)}
{props.stats["github"] && (
<GithubStats stats={props.stats["github"]} />
)}
</div>
)}
</article>
);
}
