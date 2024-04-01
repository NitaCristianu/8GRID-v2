"use client"
import { labels_data } from '@/app/scene/[id]/data/elements';
import { ACCENT, BACKGROUND, GRID_POSITION, HOVERING_LABELS, MODE, SECONDARY, SELECTED, SELECT_RECT, VARIABLES, vec2D } from '@/app/scene/[id]/data/globals';
import { motion, useScroll } from 'framer-motion';
import { useAtom } from 'jotai';
import React, { FormEvent, RefObject, createRef, useCallback, useEffect, useRef, useState } from 'react';
import style from "./styles.module.css";
import { createFragmentList, transparent } from '@/app/scene/[id]/data/management';
import { usePrevious } from '@/app/scene/[id]/hooks/usePrevious';
import ReactTextareaAutosize from 'react-textarea-autosize';
import { Fragment, Tag, variable } from '@/app/scene/[id]/data/props';
import 'katex/dist/katex.min.css';
import KaTeX from './Tex';
import useResize from '@/app/scene/[id]/hooks/useResize';

interface slider_props {
    at: number,
    var: string,
    from: number,
    to: number
}


export interface Label_Props {
    id: string
}

function getSlider(inputString: string): slider_props {
    const varPattern = /var\s+(\w+)/;
    const fromPattern = /from\s+(-?[\d.]+)/;
    const toPattern = /to\s+(-?[\d.]+)/;
    const atPattern = /at\s+(-?[\d.]+)/;


    const varMatch = inputString.match(varPattern);
    const fromMatch = inputString.match(fromPattern);
    const toMatch = inputString.match(toPattern);
    const atMatch = inputString.match(atPattern);

    var varValue, fromValue, toValue, atValue;
    if (varMatch)
        varValue = varMatch[1];
    if (fromMatch)
        fromValue = parseFloat(fromMatch[1]);
    if (toMatch)
        toValue = parseFloat(toMatch[1]);
    if (atMatch)
        atValue = parseFloat(atMatch[1]);

    return {
        var: varValue || "",
        from: fromValue || 0,
        to: toValue || 1,
        at: atValue || 0.5
    }
}

export default function Label(props: Label_Props) {
    const { id } = props;
    const [data, set_data] = useAtom(labels_data);
    const [mode, set_mode] = useAtom(MODE);
    const [offset, set_offset] = useAtom(GRID_POSITION);
    const [bgr] = useAtom(BACKGROUND);
    const [acc] = useAtom(ACCENT);
    const [sec] = useAtom(SECONDARY);
    const size = useResize();
    const label_self = data[data.findIndex(l => l.id == id)];
    const index = data.findIndex(l => l.id == id);
    const self_ref = useRef<HTMLDivElement>(null);
    const content = label_self?.content;
    const text_area = useRef<HTMLTextAreaElement>(null);
    const [variables, set_variables] = useAtom<variable[]>(VARIABLES);
    const [hovering_labels, setHoveringLabels] = useAtom(HOVERING_LABELS);
    const [mpos, SetMpos] = useState<vec2D>({ 'x': 0, 'y': 0 });
    const [edit_mode, set_edit_mode] = useState(false);

    const [render_queue, set_render_queue] = useState<Fragment[]>([{ content: content || "", type: "default" }]);

    useEffect(() => {
        const tags: Tag[] = [
            { name: "slider", open: "<s>", closing: "</s>" },
            { name: "TeX", open: "<f>", closing: "</f>" },
        ]
        let toParse = content;
        var bold_i = 0;
        toParse = toParse.replace(/\n/g, "<br>")
        toParse = toParse.replaceAll("**", () => { bold_i++; return bold_i % 2 == 1 ? "<strong>" : "</strong>"; })
        toParse = toParse.replaceAll("*", () => { bold_i++; return bold_i % 2 == 1 ? "<em>" : "</em>"; })
        const parsedList = createFragmentList(toParse, tags);
        set_render_queue(parsedList);
    }, [content, edit_mode, data])
    return <motion.div
        ref={self_ref}
        className={style.Label}
        style={{
            background: transparent(sec, 0.2),
            zIndex: 6,
            left: label_self.left + offset.x,
            top: label_self.top + offset.y,
            width: 30 * 16
        }}
        onHoverEnd={() => {
            setHoveringLabels(prev => {
                const clone = [...prev];
                clone.splice(clone.findIndex(g => g == label_self.id));
                return clone;
            });
        }}
        onHoverStart={() => {
            if (!hovering_labels.includes(label_self.id)) {
                setHoveringLabels(prev => [...prev, label_self.id]);
            }
        }}
    > <div
        style={{
            userSelect: 'none'
        }}
    >{render_queue.map((frag, i) => {
        if (frag.type == "default") {
            return <p
                key={label_self.id + "-" + i}
                style={{
                    userSelect: 'none',
                    color: acc
                }}
                dangerouslySetInnerHTML={{ __html: frag.content }}
            />
        }
        if (frag.type == "TeX") {
            return <KaTeX
                key={label_self.id + "-" + i}
                tex={frag.content}
            />
        }
        if (frag.type == "slider") {
            const props = getSlider(frag.content);
            var index = variables.findIndex(p => p.name == props.var);
            if (index == -1) {
                const copy = [...variables];
                index = copy.push({ name: props.var, value: props.at }) - 1;
                set_variables(copy);
            }

            return <div
                key={label_self.id + "-" + i}
                style={{
                    fontFamily: "Poppins",
                    fontWeight: "800",
                    gap: "1rem",
                    background: transparent(sec, 0.3),
                    padding: 10,
                    borderRadius: "0.8rem",
                    marginBottom: -20
                }}
            >
                <p style={{
                    marginLeft: 20,
                    color: acc,
                    fontFamily: "Crimson Text",
                    marginBottom: -15
                }}>{props.var} = {variables[index] && variables[index].value.toFixed(2)}</p>
                <div
                    style={{
                        display: "flex",
                        gap: "1rem",
                        padding: 20,
                    }}
                >
                    <p
                        style={{ color: acc }}
                    >{props.from}</p>
                    <input
                        title="slider"
                        type="range"
                        min={props.from}
                        style={{
                            width: '100%',
                        }}
                        max={props.to}
                        step={0.0001}
                        value={variables[index] && variables[index].value}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            const copy = [...variables];
                            copy[copy.findIndex(p => p.name == props.var)].value = parseFloat(event.target.value);
                            set_variables(copy);
                        }}
                    ></input>
                    <p style={{ color: acc }} >{props.to}</p>
                </div>
            </div>
        }
        return null;
    })}</div>

    </motion.div >


}