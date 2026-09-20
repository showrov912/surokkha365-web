import React, { useState } from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp, Trash2, Plus, Save, FileText, X } from "lucide-react";
import { useWebsiteData, BlogData, BlogSection } from "@/context/WebsiteContext";
import { supabase } from "@/lib/supabaseClient";

export default function BlogEditorPanel({ openSection, toggleSection, simulateAction }: any) {
  const { blogsData, setBlogsData } = useWebsiteData();
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, updateFn: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const tempUrl = URL.createObjectURL(file);
      updateFn(tempUrl);
      
      const fileName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
      const { data, error } = await supabase.storage.from('assets').upload(fileName, file);
      
      if (data) {
        const { data: publicUrlData } = supabase.storage.from('assets').getPublicUrl(fileName);
        updateFn(publicUrlData.publicUrl);
      } else {
        console.error("Upload failed", error);
      }
    }
  };

  const addBlog = () => {
    const newBlog: BlogData = {
      id: `new-blog-${Date.now()}`,
      title: { en: "New Blog Post", bn: "নতুন ব্লগ পোস্ট" },
      excerpt: { en: "Excerpt here...", bn: "সারাংশ এখানে..." },
      date: { en: "Today", bn: "আজ" },
      category: { en: "Tips", bn: "টিপস" },
      image: "/pest1.jpg",
      introHook: { en: "Intro hook here...", bn: "ইন্ট্রো হুক এখানে..." },
      sections: { en: [], bn: [] }
    };
    setBlogsData([...blogsData, newBlog]);
    setEditingBlogId(newBlog.id);
  };

  const currentBlog = blogsData.find((b: BlogData) => b.id === editingBlogId);

  const updateCurrentBlog = (updater: (blog: BlogData) => BlogData) => {
    if (!currentBlog) return;
    setBlogsData(blogsData.map((b: BlogData) => b.id === currentBlog.id ? updater(b) : b));
  };

  return (
    <div style={{ backgroundColor: "white", borderRadius: "12px", border: "1px solid var(--color-line)", overflow: "hidden" }}>
      <button 
        onClick={() => toggleSection("blogs")}
        style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 24px", background: "none", border: "none", cursor: "pointer" }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ width: "40px", height: "40px", borderRadius: "8px", backgroundColor: "rgba(253, 69, 2, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-orange)" }}>
            <FileText size={20} />
          </div>
          <div style={{ textAlign: "left" }}>
            <h2 style={{ fontSize: "16px", fontWeight: 600, color: "var(--color-black)", margin: 0 }}>5. Blog Articles</h2>
            <span style={{ fontSize: "13px", color: "var(--color-charcoal)" }}>Create, edit, and publish blog posts.</span>
          </div>
        </div>
        {openSection === "blogs" ? <ChevronUp size={20} color="var(--color-charcoal)" /> : <ChevronDown size={20} color="var(--color-charcoal)" />}
      </button>
      
      {openSection === "blogs" && (
        <div style={{ padding: "0 24px 24px", borderTop: "1px solid var(--color-line)" }}>
          
          {!editingBlogId ? (
            <div style={{ marginTop: "24px", display: "flex", flexDirection: "column", gap: "16px" }}>
              {blogsData.map((blog: BlogData) => (
                <div key={blog.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px", border: "1px solid var(--color-line)", borderRadius: "8px", backgroundColor: "#f8fafc" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                    <div style={{ width: "60px", height: "40px", position: "relative", borderRadius: "4px", overflow: "hidden" }}>
                      <Image src={blog.image} alt={blog.title.en} fill style={{ objectFit: "cover" }} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: "14px", color: "var(--color-black)" }}>{blog.title.en}</div>
                      <div style={{ fontSize: "12px", color: "var(--color-charcoal)" }}>{blog.category.en} • {blog.date.en}</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button onClick={() => setEditingBlogId(blog.id)} style={{ padding: "6px 12px", backgroundColor: "white", border: "1px solid var(--color-line)", borderRadius: "6px", cursor: "pointer", fontSize: "12px", fontWeight: 600 }}>Edit</button>
                    <button onClick={() => setBlogsData(blogsData.filter((b: BlogData) => b.id !== blog.id))} style={{ padding: "6px 12px", backgroundColor: "#fee2e2", color: "#ef4444", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "12px", fontWeight: 600 }}>Delete</button>
                  </div>
                </div>
              ))}
              <button onClick={addBlog} style={{ border: "2px dashed var(--color-line)", borderRadius: "8px", padding: "16px", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", cursor: "pointer", background: "white", color: "var(--color-black)", fontWeight: 600, fontSize: "14px" }}>
                <Plus size={18} /> Add New Blog Post
              </button>
            </div>
          ) : currentBlog && (
            <div style={{ marginTop: "24px", display: "flex", flexDirection: "column", gap: "24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--color-line)", paddingBottom: "16px" }}>
                <h3 style={{ margin: 0, fontSize: "18px", fontWeight: 700 }}>Editing: {currentBlog.title.en}</h3>
                <button onClick={() => setEditingBlogId(null)} style={{ padding: "6px", background: "none", border: "none", cursor: "pointer" }}><X size={20} /></button>
              </div>

              {/* Basic Fields */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, marginBottom: "6px" }}>Slug / URL ID</label>
                  <input type="text" value={currentBlog.id} onChange={e => updateCurrentBlog(b => ({...b, id: e.target.value}))} style={{ width: "100%", padding: "10px", border: "1px solid var(--color-line)", borderRadius: "6px" }} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, marginBottom: "6px" }}>Cover Image</label>
                  <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, url => updateCurrentBlog(b => ({...b, image: url})))} style={{ fontSize: "12px" }} />
                </div>
              </div>

              {/* Bilingual Fields */}
              {['en', 'bn'].map(lang => (
                <div key={lang} style={{ padding: "16px", border: "1px solid var(--color-line)", borderRadius: "8px", backgroundColor: "#f8fafc" }}>
                  <h4 style={{ margin: "0 0 16px 0", textTransform: "uppercase", fontSize: "12px", color: "var(--color-orange)" }}>{lang === 'en' ? 'English Content' : 'Bengali Content'}</h4>
                  
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    <input type="text" placeholder="Title" value={currentBlog.title[lang as 'en'|'bn']} onChange={e => updateCurrentBlog(b => ({...b, title: {...b.title, [lang]: e.target.value}}))} style={{ width: "100%", padding: "10px", border: "1px solid var(--color-line)", borderRadius: "6px" }} />
                    <input type="text" placeholder="Category" value={currentBlog.category[lang as 'en'|'bn']} onChange={e => updateCurrentBlog(b => ({...b, category: {...b.category, [lang]: e.target.value}}))} style={{ width: "100%", padding: "10px", border: "1px solid var(--color-line)", borderRadius: "6px" }} />
                    <input type="text" placeholder="Date" value={currentBlog.date[lang as 'en'|'bn']} onChange={e => updateCurrentBlog(b => ({...b, date: {...b.date, [lang]: e.target.value}}))} style={{ width: "100%", padding: "10px", border: "1px solid var(--color-line)", borderRadius: "6px" }} />
                    <textarea placeholder="Excerpt" value={currentBlog.excerpt[lang as 'en'|'bn']} onChange={e => updateCurrentBlog(b => ({...b, excerpt: {...b.excerpt, [lang]: e.target.value}}))} style={{ width: "100%", padding: "10px", border: "1px solid var(--color-line)", borderRadius: "6px", resize: "vertical" }} />
                    <textarea placeholder="Intro Hook" value={currentBlog.introHook[lang as 'en'|'bn']} onChange={e => updateCurrentBlog(b => ({...b, introHook: {...b.introHook, [lang]: e.target.value}}))} style={{ width: "100%", padding: "10px", border: "1px solid var(--color-line)", borderRadius: "6px", resize: "vertical" }} />
                    
                    {/* Blocks */}
                    <div style={{ marginTop: "16px" }}>
                      <h5 style={{ margin: "0 0 8px 0", fontSize: "13px" }}>Content Blocks</h5>
                      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        {currentBlog.sections[lang as 'en'|'bn'].map((sec: BlogSection, idx: number) => (
                          <div key={idx} style={{ display: "flex", gap: "8px", alignItems: "flex-start", backgroundColor: "white", padding: "8px", borderRadius: "6px", border: "1px solid var(--color-line)" }}>
                            <span style={{ fontSize: "10px", fontWeight: 700, padding: "4px", backgroundColor: "#eee", borderRadius: "4px" }}>{sec.type.toUpperCase()}</span>
                            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "4px" }}>
                              <textarea value={sec.text} onChange={e => {
                                updateCurrentBlog(b => {
                                  const newSections = [...b.sections[lang as 'en'|'bn']];
                                  newSections[idx] = { ...newSections[idx], text: e.target.value };
                                  return { ...b, sections: { ...b.sections, [lang]: newSections } };
                                });
                              }} style={{ width: "100%", padding: "4px", fontSize: "12px" }} rows={2} />
                              
                              {(sec.type === "soft-cta" || sec.type === "related-link") && (
                                <input type="text" placeholder="Link URL" value={sec.linkHref || ''} onChange={e => {
                                  updateCurrentBlog(b => {
                                    const newSections = [...b.sections[lang as 'en'|'bn']];
                                    newSections[idx] = { ...newSections[idx], linkHref: e.target.value };
                                    return { ...b, sections: { ...b.sections, [lang]: newSections } };
                                  });
                                }} style={{ width: "100%", padding: "4px", fontSize: "12px" }} />
                              )}
                              {sec.type === "soft-cta" && (
                                <input type="text" placeholder="Link Text" value={sec.linkText || ''} onChange={e => {
                                  updateCurrentBlog(b => {
                                    const newSections = [...b.sections[lang as 'en'|'bn']];
                                    newSections[idx] = { ...newSections[idx], linkText: e.target.value };
                                    return { ...b, sections: { ...b.sections, [lang]: newSections } };
                                  });
                                }} style={{ width: "100%", padding: "4px", fontSize: "12px" }} />
                              )}
                            </div>
                            <button onClick={() => {
                              updateCurrentBlog(b => {
                                const newSections = [...b.sections[lang as 'en'|'bn']];
                                newSections.splice(idx, 1);
                                return { ...b, sections: { ...b.sections, [lang]: newSections } };
                              });
                            }} style={{ color: "red", border: "none", background: "none", cursor: "pointer" }}><Trash2 size={14}/></button>
                          </div>
                        ))}
                      </div>

                      <div style={{ display: "flex", gap: "8px", marginTop: "12px", flexWrap: "wrap" }}>
                        <button onClick={() => updateCurrentBlog(b => ({...b, sections: {...b.sections, [lang]: [...b.sections[lang as 'en'|'bn'], {type: "p", text: "New Paragraph"}]}}))} style={{ fontSize: "11px", padding: "4px 8px", cursor: "pointer", border: "1px solid var(--color-line)", backgroundColor: "white", borderRadius: "4px" }}>+ Paragraph</button>
                        <button onClick={() => updateCurrentBlog(b => ({...b, sections: {...b.sections, [lang]: [...b.sections[lang as 'en'|'bn'], {type: "h2", text: "New Heading 2"}]}}))} style={{ fontSize: "11px", padding: "4px 8px", cursor: "pointer", border: "1px solid var(--color-line)", backgroundColor: "white", borderRadius: "4px" }}>+ H2</button>
                        <button onClick={() => updateCurrentBlog(b => ({...b, sections: {...b.sections, [lang]: [...b.sections[lang as 'en'|'bn'], {type: "h3", text: "New Heading 3"}]}}))} style={{ fontSize: "11px", padding: "4px 8px", cursor: "pointer", border: "1px solid var(--color-line)", backgroundColor: "white", borderRadius: "4px" }}>+ H3</button>
                        <button onClick={() => updateCurrentBlog(b => ({...b, sections: {...b.sections, [lang]: [...b.sections[lang as 'en'|'bn'], {type: "soft-cta", text: "CTA Text", linkText: "Click Here", linkHref: "/"}]}}))} style={{ fontSize: "11px", padding: "4px 8px", cursor: "pointer", border: "1px solid var(--color-line)", backgroundColor: "white", borderRadius: "4px" }}>+ Soft CTA</button>
                        <button onClick={() => updateCurrentBlog(b => ({...b, sections: {...b.sections, [lang]: [...b.sections[lang as 'en'|'bn'], {type: "related-link", text: "Related Link Text", linkHref: "/"}]}}))} style={{ fontSize: "11px", padding: "4px 8px", cursor: "pointer", border: "1px solid var(--color-line)", backgroundColor: "white", borderRadius: "4px" }}>+ Related Link</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button onClick={(e) => { simulateAction(e, "Saved!"); setEditingBlogId(null); }} style={{ padding: "12px 24px", backgroundColor: "var(--color-orange)", color: "white", border: "none", borderRadius: "8px", fontWeight: 600, fontSize: "14px", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}>
                  <Save size={16} /> Save Blog Post
                </button>
              </div>

            </div>
          )}
        </div>
      )}
    </div>
  );
}
