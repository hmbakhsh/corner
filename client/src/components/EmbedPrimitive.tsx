import type { embedPrimitive } from "@/types";

type EmbedPrimitiveProps = {
	embedInstance: embedPrimitive;
};

export default function EmbedPrimitive({ embedInstance }: EmbedPrimitiveProps) {
	return <h1>{embedInstance.embed_primitives.embed_url}</h1>;
}
